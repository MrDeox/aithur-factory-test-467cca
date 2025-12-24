"use client";

import { useState } from 'react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBuyClick = () => {
    window.location.href = 'https://test.com/pay';
  };

  const plans = [
    {
      name: 'Plano Básico',
      price: 'R$ 199',
      period: '/mês',
      pipelines: 'Até 5 pipelines',
      features: [
        'Checklist digital padrão',
        'Relatórios semanais',
        'Acesso ao dashboard',
        'Suporte por email'
      ],
      popular: false
    },
    {
      name: 'Plano Profissional',
      price: 'R$ 499',
      period: '/mês',
      pipelines: 'Até 20 pipelines',
      features: [
        'Todos os recursos do Básico',
        'Monitoramento em tempo real',
        'Alertas inteligentes',
        'Relatórios personalizados',
        'Suporte prioritário'
      ],
      popular: true
    },
    {
      name: 'Plano Enterprise',
      price: 'R$ 1.299',
      period: '/mês',
      pipelines: 'Pipelines ilimitados',
      features: [
        'Todos os recursos do Profissional',
        'Integração IoT avançada',
        'Dashboard empresarial',
        'Consultoria técnica',
        'Suporte 24/7'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Verification SaaS bf26</h1>
                <p className="text-xs text-gray-500">Soluções em verificação técnica</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Recursos</a>
              <a href="#plans" className="text-gray-700 hover:text-blue-600 transition-colors">Planos</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">Sobre</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contato</a>
            </nav>

            <button
              onClick={handleBuyClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              Assinar Agora
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block py-2 text-gray-700">Recursos</a>
              <a href="#plans" className="block py-2 text-gray-700">Planos</a>
              <a href="#about" className="block py-2 text-gray-700">Sobre</a>
              <a href="#contact" className="block py-2 text-gray-700">Contato</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Simplifique a verificação técnica dos seus pipelines
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Automatize processos, reduza riscos e garanta conformidade regulatória com nossa solução completa para gestão de pipelines. Feita para o mercado brasileiro.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleBuyClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                  >
                    Começar Gratuitamente
                  </button>
                  <button
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                    className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    Ver Demonstração
                  </button>
                </div>

                <div className="mt-8 flex items-center space-x-6 text-sm text-gray-500">
                  <span className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>LGPD Compliance</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Servidores no Brasil</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Suporte 24/7</span>
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Checklist de Inspeção</span>
                      <span className="text-green-600">✓ Concluído</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Monitoramento em Tempo Real</span>
                      <span className="text-blue-600">Em Progresso</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Relatório de Conformidade</span>
                      <span className="text-gray-400">Pendente</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">150+</div>
                      <div className="text-sm text-gray-600">Clientes Satisfeitos</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">99.9%</div>
                      <div className="text-sm text-gray-600">Disponibilidade</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">24/7</div>
                      <div className="text-sm text-gray-600">Suporte Técnico</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Recursos Completo</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nossa plataforma oferece tudo que você precisa para garantir a segurança e conformidade dos seus pipelines
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Checklist Digital',
                  description: 'Formulários personalizados para inspeção de pipelines com validação automática',
                  icon: '📋'
                },
                {
                  title: 'Monitoramento IoT',
                  description: 'Integração com sensores para monitoramento em tempo real de pressão e temperatura',
                  icon: '📡'
                },
                {
                  title: 'Relatórios Automatizados',
                  description: 'Geração automática de relatórios de conformidade para auditorias',
                  icon: '📊'
                },
                {
                  title: 'Alertas Inteligentes',
                  description: 'Notificações em tempo real para manutenção preventiva e correções urgentes',
                  icon: '⚠️'
                },
                {
                  title: 'Dashboard Executivo',
                  description: 'Visão geral das operações com métricas de performance e KPIs',
                  icon: '📈'
                },
                {
                  title: 'Gestão de Manutenção',
                  description: 'Planejamento e acompanhamento de manutenções programadas',
                  icon: '🔧'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section id="plans" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Escolha seu Plano</h2>
              <p className="text-lg text-gray-600">Planos criados para todas as necessidades do seu negócio</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8" id="demo">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg p-8 border-2 ${
                    plan.popular ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="text-center mb-4">
                      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-500">{plan.pipelines}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={handleBuyClick}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Assinar {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Pronto para transformar sua gestão de pipelines?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Comece agora e ganhe 15 dias de teste gratuito. Sem compromisso, sem risco.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBuyClick}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Começar Teste Grátis
              </button>
              <button
                onClick={() => window.location.href = 'mailto:cotacao@verificationsaas.com.br'}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Solicitar Demonstração
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VS</span>
                </div>
                <span className="font-semibold">Verification SaaS bf26</span>
              </div>
              <p className="text-gray-400 text-sm">
                Soluções em verificação técnica de pipelines para o mercado brasileiro.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produtos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Checklist Digital</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Monitoramento IoT</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Relatórios Automatizados</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dashboard Executivo</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreira</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status do Sistema</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Verification SaaS bf26. Todos os direitos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">WhatsApp: +55 11 91234-5678</span>
              <span className="text-gray-400 text-sm">|</span>
              <span className="text-gray-400 text-sm">contato@verificationsaas.com.br</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
