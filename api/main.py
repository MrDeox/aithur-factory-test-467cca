"""
Verification SaaS bf26 - FastAPI Backend
Micro-SaaS for technical pipeline verification
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import asyncio
import logging
from datetime import datetime, timedelta
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Verification SaaS bf26 API",
    description="API para verificação técnica de pipelines",
    version="1.0.0"
)

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if "DEBUG" in locals() else ["https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Pipeline(BaseModel):
    id: str
    name: str
    location: str
    diameter: float
    material: str
    installation_date: str
    last_inspection: Optional[str] = None
    status: str = "active"
    sensors: List[str] = []

class ChecklistItem(BaseModel):
    id: str
    description: str
    required: bool
    category: str
    priority: str

class InspectionReport(BaseModel):
    pipeline_id: str
    inspector: str
    date: str
    checklist_results: Dict[str, bool]
    observations: str
    status: str
    recommendations: List[str]

class SensorData(BaseModel):
    pipeline_id: str
    sensor_type: str
    value: float
    timestamp: str
    unit: str

# In-memory storage (replace with database in production)
pipelines_db: Dict[str, Pipeline] = {}
checklists_db: List[ChecklistItem] = []
reports_db: List[InspectionReport] = []
sensor_data_db: List[SensorData] = []

# Sample data initialization
async def init_sample_data():
    """Initialize with sample data for demonstration"""
    global checklists_db
    
    checklists_db = [
        ChecklistItem(
            id="c1",
            description="Verificação de corrosão externa",
            required=True,
            category="segurança",
            priority="high"
        ),
        ChecklistItem(
            id="c2",
            description="Teste de pressão hidrostática",
            required=True,
            category="performance",
            priority="high"
        ),
        ChecklistItem(
            id="c3",
            description="Inspeção de soldas",
            required=True,
            category="integridade",
            priority="medium"
        )
    ]
    
    logger.info("Sample data initialized")

@app.on_event("startup")
async def startup_event():
    await init_sample_data()

# API Routes
@app.get("/")
async def root():
    return {
        "message": "Verification SaaS bf26 API",
        "version": "1.0.0",
        "status": "online",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "database": "connected",
            "sensors": "active",
            "api": "operational"
        }
    }

@app.get("/pipelines", response_model=List[Pipeline])
async def get_pipelines():
    """Get all pipelines"""
    return list(pipelines_db.values())

@app.post("/pipelines", response_model=Pipeline)
async def create_pipeline(pipeline: Pipeline):
    """Create a new pipeline"""
    if pipeline.id in pipelines_db:
        raise HTTPException(status_code=400, detail="Pipeline already exists")
    
    pipelines_db[pipeline.id] = pipeline
    logger.info(f"Pipeline created: {pipeline.name}")
    
    return pipeline

@app.get("/pipelines/{pipeline_id}", response_model=Pipeline)
async def get_pipeline(pipeline_id: str):
    """Get pipeline by ID"""
    if pipeline_id not in pipelines_db:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    return pipelines_db[pipeline_id]

@app.put("/pipelines/{pipeline_id}", response_model=Pipeline)
async def update_pipeline(pipeline_id: str, pipeline: Pipeline):
    """Update pipeline"""
    if pipeline_id not in pipelines_db:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    pipelines_db[pipeline_id] = pipeline
    logger.info(f"Pipeline updated: {pipeline.name}")
    
    return pipeline

@app.delete("/pipelines/{pipeline_id}")
async def delete_pipeline(pipeline_id: str):
    """Delete pipeline"""
    if pipeline_id not in pipelines_db:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    del pipelines_db[pipeline_id]
    logger.info(f"Pipeline deleted: {pipeline_id}")
    
    return {"message": "Pipeline deleted successfully"}

@app.get("/checklists", response_model=List[ChecklistItem])
async def get_checklists():
    """Get all checklist items"""
    return checklists_db

@app.post("/checklists", response_model=ChecklistItem)
async def create_checklist_item(item: ChecklistItem):
    """Create new checklist item"""
    checklists_db.append(item)
    logger.info(f"Checklist item created: {item.description}")
    
    return item

@app.post("/inspections", response_model=InspectionReport)
async def create_inspection_report(report: InspectionReport):
    """Create inspection report"""
    if report.pipeline_id not in pipelines_db:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    # Validate checklist results
    checklist_ids = {item.id for item in checklists_db}
    for checklist_id in report.checklist_results.keys():
        if checklist_id not in checklist_ids:
            raise HTTPException(status_code=400, detail="Invalid checklist item")
    
    reports_db.append(report)
    logger.info(f"Inspection report created for pipeline: {report.pipeline_id}")
    
    # Update pipeline last inspection date
    pipeline = pipelines_db[report.pipeline_id]
    pipeline.last_inspection = report.date
    
    return report

@app.get("/inspections/pipeline/{pipeline_id}", response_model=List[InspectionReport])
async def get_pipeline_inspections(pipeline_id: str):
    """Get all inspections for a pipeline"""
    if pipeline_id not in pipelines_db:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    return [report for report in reports_db if report.pipeline_id == pipeline_id]

@app.post("/sensors/data", response_model=SensorData)
async def create_sensor_data(data: SensorData):
    """Create sensor data entry"""
    if data.pipeline_id not in pipelines_db:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    sensor_data_db.append(data)
    logger.info(f"Sensor data received: {data.sensor_type} - {data.value}{data.unit}")
    
    # Trigger background analysis
    await analyze_sensor_data(data)
    
    return data

@app.get("/sensors/data/pipeline/{pipeline_id}", response_model=List[SensorData])
async def get_pipeline_sensor_data(pipeline_id: str, limit: int = 100):
    """Get sensor data for a pipeline"""
    if pipeline_id not in pipelines_db:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    data = [d for d in sensor_data_db if d.pipeline_id == pipeline_id][-limit:]
    return data

@app.get("/dashboard/summary")
async def get_dashboard_summary():
    """Get dashboard summary data"""
    total_pipelines = len(pipelines_db)
    active_pipelines = len([p for p in pipelines_db.values() if p.status == "active"])
    total_inspections = len(reports_db)
    recent_inspections = len([r for r in reports_db if datetime.fromisoformat(r.date) > datetime.now() - timedelta(days=30)])
    
    # Calculate compliance rate
    compliance_score = 0
    if reports_db:
        total_checks = len(reports_db) * len(checklists_db)
        passed_checks = sum([sum(r.checklist_results.values()) for r in reports_db])
        compliance_score = (passed_checks / total_checks) * 100 if total_checks > 0 else 0
    
    return {
        "total_pipelines": total_pipelines,
        "active_pipelines": active_pipelines,
        "total_inspections": total_inspections,
        "recent_inspections": recent_inspections,
        "compliance_score": round(compliance_score, 1),
        "last_update": datetime.now().isoformat()
    }

# Background tasks
async def analyze_sensor_data(data: SensorData):
    """Background task to analyze sensor data and trigger alerts"""
    await asyncio.sleep(0.1)  # Simulate processing time
    
    # Example: Check for abnormal pressure readings
    if data.sensor_type == "pressure" and data.value > 100:
        logger.warning(f"ALERT: High pressure detected in pipeline {data.pipeline_id}: {data.value}{data.unit}")
        
        # In production, this would send notifications
        # await send_alert(data.pipeline_id, "High pressure detected", data.value)

async def generate_compliance_report(pipeline_id: str):
    """Generate compliance report for a pipeline"""
    pipeline_inspections = [r for r in reports_db if r.pipeline_id == pipeline_id]
    
    if not pipeline_inspections:
        return {"error": "No inspections found for this pipeline"}
    
    latest_report = max(pipeline_inspections, key=lambda x: x.date)
    checklist_items = len(checklists_db)
    passed_items = sum(latest_report.checklist_results.values())
    
    return {
        "pipeline_id": pipeline_id,
        "last_inspection": latest_report.date,
        "compliance_score": (passed_items / checklist_items) * 100,
        "status": "compliant" if passed_items == checklist_items else "non-compliant",
        "recommendations": latest_report.recommendations
    }

@app.post("/reports/compliance/{pipeline_id}")
async def get_compliance_report(pipeline_id: str):
    """Get compliance report for a pipeline"""
    if pipeline_id not in pipelines_db:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    return await generate_compliance_report(pipeline_id)

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    logger.error(f"HTTP Exception: {exc.detail}")
    return {
        "error": True,
        "message": exc.detail,
        "status_code": exc.status_code
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
