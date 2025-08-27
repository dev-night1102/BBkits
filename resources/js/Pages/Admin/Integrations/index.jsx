import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function IntegrationsIndex({ tinyErp, whatsApp, stats }) {
    const { auth } = usePage().props;
    const [testing, setTesting] = useState({ tinyErp: false, whatsApp: false });
    const [testResults, setTestResults] = useState({ tinyErp: null, whatsApp: null });

    const testTinyErp = async () => {
        setTesting(prev => ({ ...prev, tinyErp: true }));
        
        try {
            const response = await fetch('/admin/integrations/test-tiny-erp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });
            
            const result = await response.json();
            setTestResults(prev => ({ ...prev, tinyErp: result }));
        } catch (error) {
            setTestResults(prev => ({ ...prev, tinyErp: { success: false, message: 'Erro de conexão' } }));
        } finally {
            setTesting(prev => ({ ...prev, tinyErp: false }));
        }
    };

    const testWhatsApp = async () => {
        setTesting(prev => ({ ...prev, whatsApp: true }));
        
        try {
            const response = await fetch('/admin/integrations/test-whatsapp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });
            
            const result = await response.json();
            setTestResults(prev => ({ ...prev, whatsApp: result }));
        } catch (error) {
            setTestResults(prev => ({ ...prev, whatsApp: { success: false, message: 'Erro de conexão' } }));
        } finally {
            setTesting(prev => ({ ...prev, whatsApp: false }));
        }
    };

    const bulkSync = () => {
        if (confirm('Sincronizar todos os pedidos com Tiny ERP? Esta operação pode demorar alguns minutos.')) {
            router.post('/admin/integrations/bulk-sync');
        }
    };

    const getStatusBadge = (status) => {
        if (status.success) {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✅ Conectado
                </span>
            );
        } else {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    ❌ Desconectado
                </span>
            );
        }
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat('pt-BR').format(num);
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
                
                :root {
                    --primary-color: #D4A574;
                    --secondary-color: #F5E6D3;
                    --accent-color: #E8B4CB;
                    --gradient: linear-gradient(135deg, #D4A574 0%, #E8B4CB 100%);
                    --gradient-soft: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 100%);
                    --shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    --shadow-hover: 0 25px 50px rgba(0, 0, 0, 0.2);
                }

                * {
                    font-family: 'Poppins', sans-serif;
                }

                .dashboard-bg {
                    background: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 50%, #F0F9FF 100%);
                    min-height: 100vh;
                }

                .card-gradient {
                    background: var(--gradient-soft);
                    border-radius: 25px;
                    box-shadow: var(--shadow);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 2px solid transparent;
                    position: relative;
                    overflow: hidden;
                }

                .card-gradient:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-hover);
                    border-color: var(--primary-color);
                }

                .stat-card {
                    background: var(--gradient);
                    border-radius: 20px;
                    box-shadow: var(--shadow);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                }

                .integration-card {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%);
                    border-radius: 20px;
                    box-shadow: var(--shadow);
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .integration-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: var(--gradient);
                }

                .integration-card:hover {
                    transform: translateY(-3px);
                    border-color: var(--primary-color);
                    box-shadow: var(--shadow-hover);
                }

                .btn-primary {
                    background: var(--gradient);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    padding: 10px 20px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(212, 165, 116, 0.3);
                }

                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(212, 165, 116, 0.4);
                }

                .btn-secondary {
                    background: rgba(255, 255, 255, 0.9);
                    color: var(--primary-color);
                    border: 2px solid var(--primary-color);
                    border-radius: 12px;
                    padding: 10px 20px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .btn-secondary:hover {
                    background: var(--primary-color);
                    color: white;
                    transform: translateY(-2px);
                }

                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: .5;
                    }
                }
            `}</style>

            <AuthenticatedLayout
                header={
                    <div className="flex items-center justify-between bg-white/95 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-lg border border-white/20">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                            Integrações BBKits 🔗
                        </h2>
                        <div className="flex items-center gap-4">
                            <a
                                href="/admin/integrations/logs"
                                className="btn-secondary text-sm"
                            >
                                📋 Ver Logs
                            </a>
                            <button
                                onClick={bulkSync}
                                className="btn-primary text-sm"
                            >
                                🔄 Sincronizar Tudo
                            </button>
                        </div>
                    </div>
                }
            >
                <Head title="Integrações - BBKits" />

                <div className="dashboard-bg">
                    <div className="py-12">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            
                            {/* Integration Status Cards */}
                            <div className="grid gap-8 mb-12 md:grid-cols-2">
                                {/* Tiny ERP Integration */}
                                <div className="integration-card p-8">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                                    <span className="text-2xl">📊</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-800">Tiny ERP</h3>
                                                    <p className="text-sm text-gray-600">Sistema de gestão empresarial</p>
                                                </div>
                                            </div>
                                            {getStatusBadge(tinyErp.status)}
                                        </div>
                                        <button
                                            onClick={testTinyErp}
                                            disabled={testing.tinyErp}
                                            className={`btn-secondary text-sm ${testing.tinyErp ? 'opacity-50 animate-pulse' : ''}`}
                                        >
                                            {testing.tinyErp ? '🔄 Testando...' : '🧪 Testar Conexão'}
                                        </button>
                                    </div>

                                    {testResults.tinyErp && (
                                        <div className={`mb-4 p-3 rounded-lg ${testResults.tinyErp.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                            <p className="text-sm font-medium">{testResults.tinyErp.message}</p>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">🌐 URL Base:</span>
                                            <span className="text-sm font-medium">{tinyErp.config.base_url}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">🔑 Token Configurado:</span>
                                            <span className={`text-sm font-medium ${tinyErp.config.has_token ? 'text-green-600' : 'text-red-600'}`}>
                                                {tinyErp.config.has_token ? '✅ Sim' : '❌ Não'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">📦 Remetente Configurado:</span>
                                            <span className={`text-sm font-medium ${tinyErp.config.sender_configured ? 'text-green-600' : 'text-red-600'}`}>
                                                {tinyErp.config.sender_configured ? '✅ Sim' : '❌ Não'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h4 className="font-semibold text-gray-800 mb-3">📈 Estatísticas</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center p-3 bg-white/70 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-600">{formatNumber(stats.tiny_erp.invoices_generated)}</div>
                                                <div className="text-xs text-gray-600">Notas Geradas</div>
                                            </div>
                                            <div className="text-center p-3 bg-white/70 rounded-lg">
                                                <div className="text-2xl font-bold text-green-600">{formatNumber(stats.tiny_erp.shipping_labels_generated)}</div>
                                                <div className="text-xs text-gray-600">Etiquetas Geradas</div>
                                            </div>
                                            <div className="text-center p-3 bg-white/70 rounded-lg">
                                                <div className="text-2xl font-bold text-purple-600">{stats.tiny_erp.success_rate}%</div>
                                                <div className="text-xs text-gray-600">Taxa de Sucesso</div>
                                            </div>
                                            <div className="text-center p-3 bg-white/70 rounded-lg">
                                                <div className="text-2xl font-bold text-orange-600">{formatNumber(stats.tiny_erp.invoices_this_month)}</div>
                                                <div className="text-xs text-gray-600">Este Mês</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* WhatsApp Integration */}
                                <div className="integration-card p-8">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                                    <span className="text-2xl">💬</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-800">WhatsApp WATI</h3>
                                                    <p className="text-sm text-gray-600">Mensagens automatizadas</p>
                                                </div>
                                            </div>
                                            {getStatusBadge(whatsApp.status)}
                                        </div>
                                        <button
                                            onClick={testWhatsApp}
                                            disabled={testing.whatsApp}
                                            className={`btn-secondary text-sm ${testing.whatsApp ? 'opacity-50 animate-pulse' : ''}`}
                                        >
                                            {testing.whatsApp ? '🔄 Testando...' : '🧪 Testar Conexão'}
                                        </button>
                                    </div>

                                    {testResults.whatsApp && (
                                        <div className={`mb-4 p-3 rounded-lg ${testResults.whatsApp.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                            <p className="text-sm font-medium">{testResults.whatsApp.message}</p>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">🌐 URL Base:</span>
                                            <span className="text-sm font-medium">{whatsApp.config.base_url}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">🔑 Token Configurado:</span>
                                            <span className={`text-sm font-medium ${whatsApp.config.has_token ? 'text-green-600' : 'text-red-600'}`}>
                                                {whatsApp.config.has_token ? '✅ Sim' : '❌ Não'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">🔥 Ativo:</span>
                                            <span className={`text-sm font-medium ${whatsApp.config.enabled ? 'text-green-600' : 'text-red-600'}`}>
                                                {whatsApp.config.enabled ? '✅ Sim' : '❌ Não'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">📝 Templates:</span>
                                            <span className="text-sm font-medium text-blue-600">{whatsApp.config.templates_count} configurados</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h4 className="font-semibold text-gray-800 mb-3">📈 Estatísticas</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center p-3 bg-white/70 rounded-lg">
                                                <div className="text-2xl font-bold text-green-600">{formatNumber(stats.whatsapp.total_sent)}</div>
                                                <div className="text-xs text-gray-600">Total Enviadas</div>
                                            </div>
                                            <div className="text-center p-3 bg-white/70 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-600">{formatNumber(stats.whatsapp.sent_this_month)}</div>
                                                <div className="text-xs text-gray-600">Este Mês</div>
                                            </div>
                                            <div className="text-center p-3 bg-white/70 rounded-lg">
                                                <div className="text-2xl font-bold text-purple-600">{stats.whatsapp.success_rate}%</div>
                                                <div className="text-xs text-gray-600">Taxa de Sucesso</div>
                                            </div>
                                            <div className="text-center p-3 bg-white/70 rounded-lg">
                                                <div className="text-2xl font-bold text-orange-600">{formatNumber(stats.whatsapp.photo_requests)}</div>
                                                <div className="text-xs text-gray-600">Fotos Enviadas</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Overall Statistics */}
                            <div className="stat-card p-8 mb-8">
                                <div className="flex items-center justify-between text-white">
                                    <div>
                                        <div className="flex items-center mb-3">
                                            <span className="text-3xl mr-3">📊</span>
                                            <h4 className="text-2xl font-bold">Visão Geral das Integrações</h4>
                                        </div>
                                        <p className="text-white/90 text-lg">Performance geral dos sistemas integrados</p>
                                    </div>
                                </div>
                                
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="text-center p-6 bg-white/20 backdrop-blur-lg rounded-xl">
                                        <div className="text-3xl font-bold text-white mb-2">{formatNumber(stats.orders.total_orders)}</div>
                                        <div className="text-white/80 text-sm">Total de Pedidos</div>
                                    </div>
                                    <div className="text-center p-6 bg-white/20 backdrop-blur-lg rounded-xl">
                                        <div className="text-3xl font-bold text-white mb-2">{formatNumber(stats.orders.orders_this_month)}</div>
                                        <div className="text-white/80 text-sm">Pedidos Este Mês</div>
                                    </div>
                                    <div className="text-center p-6 bg-white/20 backdrop-blur-lg rounded-xl">
                                        <div className="text-3xl font-bold text-white mb-2">{formatNumber(stats.orders.integrated_orders)}</div>
                                        <div className="text-white/80 text-sm">Pedidos Integrados</div>
                                    </div>
                                    <div className="text-center p-6 bg-white/20 backdrop-blur-lg rounded-xl">
                                        <div className="text-3xl font-bold text-white mb-2">{stats.orders.integration_rate}%</div>
                                        <div className="text-white/80 text-sm">Taxa de Integração</div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="card-gradient p-8">
                                <h4 className="text-xl font-bold text-gray-800 mb-6">🚀 Ações Rápidas</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <a
                                        href="/admin/sales"
                                        className="flex items-center p-4 bg-white/70 rounded-lg hover:bg-white/90 transition-all duration-300 hover:transform hover:scale-105"
                                    >
                                        <span className="text-2xl mr-3">📋</span>
                                        <div>
                                            <div className="font-semibold text-gray-800">Gerenciar Vendas</div>
                                            <div className="text-sm text-gray-600">Processar pedidos manualmente</div>
                                        </div>
                                    </a>
                                    <a
                                        href="/admin/integrations/logs"
                                        className="flex items-center p-4 bg-white/70 rounded-lg hover:bg-white/90 transition-all duration-300 hover:transform hover:scale-105"
                                    >
                                        <span className="text-2xl mr-3">📊</span>
                                        <div>
                                            <div className="font-semibold text-gray-800">Ver Logs</div>
                                            <div className="text-sm text-gray-600">Histórico de integrações</div>
                                        </div>
                                    </a>
                                    <a
                                        href="/admin/enhanced-dashboard"
                                        className="flex items-center p-4 bg-white/70 rounded-lg hover:bg-white/90 transition-all duration-300 hover:transform hover:scale-105"
                                    >
                                        <span className="text-2xl mr-3">📈</span>
                                        <div>
                                            <div className="font-semibold text-gray-800">Dashboard</div>
                                            <div className="text-sm text-gray-600">Visão geral do sistema</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}