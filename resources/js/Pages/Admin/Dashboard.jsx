import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import RankingDisplay from '@/Components/RankingDisplay';

export default function Dashboard({ stats, topPerformers, recentSales, monthlyData }) {
    const { auth } = usePage().props;
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
    const [refreshInterval, setRefreshInterval] = useState(30); // seconds

    const handleManualRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            only: ['stats', 'topPerformers', 'recentSales', 'monthlyData'],
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setIsRefreshing(false);
            },
            onError: () => {
                setIsRefreshing(false);
            }
        });
    };

    useEffect(() => {
        if (!autoRefreshEnabled) return;

        const interval = setInterval(() => {
            setIsRefreshing(true);
            router.reload({
                only: ['stats', 'topPerformers', 'recentSales', 'monthlyData'],
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setIsRefreshing(false);
                },
                onError: () => {
                    setIsRefreshing(false);
                }
            });
        }, refreshInterval * 1000);

        return () => clearInterval(interval);
    }, [autoRefreshEnabled, refreshInterval]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('pt-BR');
    };

    const getStatusBadge = (status) => {
        const badges = {
            pendente: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg',
            aprovado: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg',
            recusado: 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg',
        };
        
        const labels = {
            pendente: 'Pendente',
            aprovado: 'Aprovado',
            recusado: 'Recusado',
        };

        return (
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transform hover:scale-105 transition-all duration-300 ${badges[status]}`}>
                {labels[status]}
            </span>
        );
    };

    // Transform topPerformers data to match RankingDisplay component format
    const transformTopPerformersToRanking = (performers) => {
        return performers.map((performer, index) => ({
            position: index + 1,
            user: {
                id: performer.id,
                name: performer.name,
                email: performer.email,
                role: performer.role
            },
            monthly_total: performer.total_revenue,
            monthly_sales_count: performer.sales_count,
            level: {
                level: performer.total_revenue >= 60000 ? 'Elite' : 
                       performer.total_revenue >= 50000 ? 'Avançada' : 
                       performer.total_revenue >= 40000 ? 'Intermediária' : 'Iniciante'
            },
            badge: getPositionBadge(index + 1),
            motivational_message: getPositionMotivationalMessage(index + 1, performer.total_revenue),
            turnaround_alert: null // Admin view doesn't need turnaround alerts
        }));
    };

    // Helper function to get position badge
    const getPositionBadge = (position) => {
        switch (position) {
            case 1:
                return {
                    icon: '🥇',
                    color: 'text-yellow-500',
                    bg_color: 'bg-yellow-50',
                    border_color: 'border-yellow-300',
                    name: '1º Lugar',
                    title: 'Campeã do Mês! 👑'
                };
            case 2:
                return {
                    icon: '🥈',
                    color: 'text-gray-500',
                    bg_color: 'bg-gray-50',
                    border_color: 'border-gray-300',
                    name: '2º Lugar',
                    title: 'Vice-Campeã! 🌟'
                };
            case 3:
                return {
                    icon: '🥉',
                    color: 'text-orange-600',
                    bg_color: 'bg-orange-50',
                    border_color: 'border-orange-300',
                    name: '3º Lugar',
                    title: 'Terceiro Lugar! 🎉'
                };
            default:
                return {
                    icon: '🏅',
                    color: 'text-blue-500',
                    bg_color: 'bg-blue-50',
                    border_color: 'border-blue-300',
                    name: position + 'º Lugar',
                    title: 'Top ' + position + '! 💪'
                };
        }
    };

    // Helper function to get motivational message
    const getPositionMotivationalMessage = (position, monthlyTotal) => {
        switch (position) {
            case 1:
                return {
                    type: 'champion',
                    title: '🏆 Vendedora Campeã BBKits!',
                    message: 'Parabéns! Você está liderando o ranking e inspirando toda a equipe com seu desempenho excepcional!',
                    emoji: '👑'
                };
            case 2:
                return {
                    type: 'vice_champion',
                    title: '🌟 Vice-Campeã BBKits!',
                    message: 'Excelente trabalho! Você está entre as melhores e muito próxima da liderança!',
                    emoji: '🥈'
                };
            case 3:
                return {
                    type: 'third_place',
                    title: '🎉 Terceiro Lugar BBKits!',
                    message: 'Ótimo desempenho! Você está no pódio e tem potencial para subir ainda mais!',
                    emoji: '🥉'
                };
            default:
                return {
                    type: 'growth',
                    title: '📈 Vendedora em Ascensão!',
                    message: 'Você está construindo um ótimo resultado! Continue assim e logo estará no pódio!',
                    emoji: '🌟'
                };
        }
    };

    return (
        <>
            {/* Add the same premium styles from Welcome page */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
                
                :root {
                    --primary-color: #D4A574;
                    --secondary-color: #F5E6D3;
                    --accent-color: #E8B4CB;
                    --accent-dark: #C8869B;
                    --text-dark: #2C2C2C;
                    --text-light: #666;
                    --white: #FFFFFF;
                    --gradient: linear-gradient(135deg, #D4A574 0%, #E8B4CB 100%);
                    --gradient-soft: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 100%);
                    --gradient-hero: linear-gradient(135deg, rgba(212, 165, 116, 0.95) 0%, rgba(232, 180, 203, 0.95) 100%);
                    --shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    --shadow-hover: 0 25px 50px rgba(0, 0, 0, 0.2);
                    --shadow-glow: 0 0 30px rgba(212, 165, 116, 0.3);
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

                .card-gradient::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, rgba(212, 165, 116, 0.05) 0%, rgba(232, 180, 203, 0.05) 100%);
                    pointer-events: none;
                }

                .card-gradient:hover {
                    transform: translateY(-10px) scale(1.02);
                    box-shadow: var(--shadow-hover);
                    border-color: var(--primary-color);
                }

                .stat-card {
                    background: var(--gradient);
                    border-radius: 20px;
                    box-shadow: var(--shadow);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }

                .stat-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.6s;
                }

                .stat-card:hover::before {
                    left: 100%;
                }

                .stat-card:hover {
                    transform: translateY(-8px) scale(1.05);
                    box-shadow: var(--shadow-hover);
                }

                .feature-icon {
                    background: rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }

                .feature-icon:hover {
                    transform: scale(1.2) rotate(10deg);
                    box-shadow: var(--shadow-glow);
                    background: rgba(255, 255, 255, 0.3);
                }

                .floating-particles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                }

                .particle {
                    position: absolute;
                    background: rgba(212, 165, 116, 0.1);
                    border-radius: 50%;
                    animation: float 15s infinite linear;
                }

                @keyframes float {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }

                .animate-fadeInUp:nth-child(1) { animation-delay: 0.1s; }
                .animate-fadeInUp:nth-child(2) { animation-delay: 0.2s; }
                .animate-fadeInUp:nth-child(3) { animation-delay: 0.3s; }
                .animate-fadeInUp:nth-child(4) { animation-delay: 0.4s; }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .progress-bar {
                    background: var(--gradient);
                    transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }

                .progress-bar::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    animation: shimmer 2s infinite;
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                .table-row {
                    transition: all 0.3s ease;
                }

                .table-row:hover {
                    background: var(--gradient-soft);
                    transform: scale(1.01);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }

                .quick-action-btn {
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    transition: all 0.3s ease;
                }

                .quick-action-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                }

                .logo-glow {
                    background: var(--gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: logoGlow 3s ease-in-out infinite alternate;
                }

                @keyframes logoGlow {
                    0% { filter: drop-shadow(0 0 5px rgba(212, 165, 116, 0.3)); }
                    100% { filter: drop-shadow(0 0 15px rgba(212, 165, 116, 0.6)); }
                }

                .ranking-badge {
                    transition: all 0.3s ease;
                }

                .ranking-badge:hover {
                    transform: scale(1.2) rotate(5deg);
                }
            `}</style>

            <AuthenticatedLayout
                header={
                    <div className="flex items-center justify-between bg-white/95 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-lg border border-white/20">
                        <h2 className="text-2xl font-bold logo-glow">
                            Dashboard Administrativo - BBKits ✨
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-md">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={autoRefreshEnabled}
                                        onChange={(e) => setAutoRefreshEnabled(e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        autoRefreshEnabled ? 'bg-green-500' : 'bg-gray-300'
                                    }`}>
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            autoRefreshEnabled ? 'translate-x-6' : 'translate-x-1'
                                        }`} />
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-gray-700">
                                        Auto-refresh {autoRefreshEnabled && `(${refreshInterval}s)`}
                                    </span>
                                </label>
                                {isRefreshing && (
                                    <svg className="animate-spin h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                <button
                                    onClick={handleManualRefresh}
                                    disabled={isRefreshing}
                                    className="ml-2 p-2 text-gray-600 hover:text-green-600 transition-colors disabled:opacity-50"
                                    title="Atualizar agora"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </button>
                            </div>
                            <div className="text-sm text-gray-600 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full shadow-md">
                                Bem-vindo, <span className="font-semibold text-pink-600">{auth.user.name}</span>! 👋
                            </div>
                        </div>
                    </div>
                }
            >
                <Head title="Admin Dashboard - BBKits" />

                <div className="dashboard-bg relative overflow-hidden">
                    {/* Floating particles */}
                    <div className="floating-particles">
                        {Array.from({ length: 15 }, (_, i) => (
                            <div
                                key={i}
                                className="particle"
                                style={{
                                    left: Math.random() * 100 + "%",
                                    width: Math.random() * 8 + 4 + "px",
                                    height: Math.random() * 8 + 4 + "px",
                                    animationDelay: Math.random() * 15 + "s",
                                    animationDuration: Math.random() * 10 + 10 + "s",
                                }}
                            />
                        ))}
                    </div>

                    <div className="py-12 relative z-10">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            
                            {/* Stats Cards */}
                            <div className="grid gap-8 mb-12 md:grid-cols-2 xl:grid-cols-4">
                                <div className="stat-card animate-fadeInUp">
                                    <div className="p-6 flex items-center text-white relative z-10">
                                        <div className="feature-icon p-4 rounded-full mr-6">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="mb-2 text-sm font-medium text-white/90">Total de Vendedoras</p>
                                            <p className="text-3xl font-bold drop-shadow-lg">{stats.totalSellers}</p>
                                            <p className="text-xs text-white/80 mt-1">👥 Equipe BBKits</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="stat-card animate-fadeInUp">
                                    <div className="p-6 flex items-center text-white relative z-10">
                                        <div className="feature-icon p-4 rounded-full mr-6">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="mb-2 text-sm font-medium text-white/90">Vendas Este Mês</p>
                                            <p className="text-2xl font-bold drop-shadow-lg">{formatCurrency(stats.monthlyRevenue)}</p>
                                            <p className="text-xs text-white/80 mt-1">💰 Faturamento</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="stat-card animate-fadeInUp">
                                    <div className="p-6 flex items-center text-white relative z-10">
                                        <div className="feature-icon p-4 rounded-full mr-6">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="mb-2 text-sm font-medium text-white/90">Vendas Pendentes</p>
                                            <p className="text-3xl font-bold drop-shadow-lg">{stats.pendingSales}</p>
                                            <p className="text-xs text-white/80 mt-1">⏳ Aguardando</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="stat-card animate-fadeInUp">
                                    <div className="p-6 flex items-center text-white relative z-10">
                                        <div className="feature-icon p-4 rounded-full mr-6">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="mb-2 text-sm font-medium text-white/90">Comissões do Mês</p>
                                            <p className="text-2xl font-bold drop-shadow-lg">{formatCurrency(stats.monthlyCommissions)}</p>
                                            <p className="text-xs text-white/80 mt-1">🎯 Bonificações</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid gap-8 mb-12 md:grid-cols-2">
                                {/* Enhanced Top Performers Ranking */}
                                <div className="animate-fadeInUp">
                                    {topPerformers && topPerformers.length > 0 ? (
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="text-lg font-bold text-gray-800">Ranking das Vendedoras</h4>
                                                <a 
                                                    href="/admin/reports" 
                                                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg"
                                                >
                                                    Ver Relatório Detalhado →
                                                </a>
                                            </div>
                                            <RankingDisplay 
                                                ranking={transformTopPerformersToRanking(topPerformers)}
                                                currentUser={auth.user}
                                                showFull={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="card-gradient p-8 relative z-10">
                                            <div className="flex items-center mb-6">
                                                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                                                    <span className="text-2xl">🏆</span>
                                                </div>
                                                <h4 className="text-2xl font-bold text-gray-800">Top Vendedoras do Mês</h4>
                                            </div>
                                            <div className="text-center py-8">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <span className="text-2xl">📊</span>
                                                </div>
                                                <p className="text-gray-500 text-lg">Nenhuma venda este mês ainda</p>
                                                <p className="text-gray-400 text-sm">Seja a primeira! 🚀</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Monthly Progress */}
                                <div className="card-gradient p-8 relative z-10">
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                                            <span className="text-2xl">📈</span>
                                        </div>
                                        <h4 className="text-2xl font-bold text-gray-800">Progresso Mensal</h4>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between mb-3">
                                                <span className="text-lg font-medium text-gray-700">🎯 Meta Coletiva</span>
                                                <span className="text-lg font-bold text-gray-900">
                                                    {formatCurrency(stats.monthlyRevenue)} / {formatCurrency(stats.monthlyTarget)}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                                                <div 
                                                    className="progress-bar h-4 rounded-full shadow-lg" 
                                                    style={{width: `${Math.min((stats.monthlyRevenue / stats.monthlyTarget) * 100, 100)}%`}}
                                                ></div>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-2 font-medium">
                                                🔥 {((stats.monthlyRevenue / stats.monthlyTarget) * 100).toFixed(1)}% da meta alcançada
                                            </p>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                                            <div className="text-center p-4 bg-white/70 rounded-2xl shadow-md">
                                                <p className="text-sm text-gray-600 mb-2">✅ Vendas Aprovadas</p>
                                                <p className="text-3xl font-bold text-green-600">{stats.approvedSales}</p>
                                            </div>
                                            <div className="text-center p-4 bg-white/70 rounded-2xl shadow-md">
                                                <p className="text-sm text-gray-600 mb-2">📊 Taxa de Aprovação</p>
                                                <p className="text-3xl font-bold text-blue-600">
                                                    {stats.totalSalesCount > 0 ? 
                                                        ((stats.approvedSales / stats.totalSalesCount) * 100).toFixed(1) + '%' : 
                                                        '0%'
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Recent Sales */}
                            <div className="card-gradient p-8 mb-8 relative z-10">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                                        <span className="text-2xl">📋</span>
                                    </div>
                                    <h4 className="text-2xl font-bold text-gray-800">Vendas Recentes</h4>
                                </div>
                                <div className="overflow-x-auto rounded-2xl shadow-lg">
                                    <table className="min-w-full divide-y divide-gray-200 bg-white/90 backdrop-blur-sm">
                                        <thead className="bg-gradient-to-r from-pink-50 to-purple-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700">
                                                    👩‍💼 Vendedora
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700">
                                                    👤 Cliente
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700">
                                                    💰 Valor
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700">
                                                    📅 Data
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700">
                                                    📊 Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {recentSales && recentSales.length > 0 ? (
                                                recentSales.map((sale, index) => (
                                                    <tr key={sale.id} className="table-row" style={{ animationDelay: `${index * 0.1}s` }}>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                                                            {sale.user.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700 font-medium">
                                                            {sale.client_name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-green-600">
                                                            {formatCurrency(sale.received_amount)}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                            {formatDate(sale.payment_date)}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                            {getStatusBadge(sale.status)}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-12 text-center">
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                                <span className="text-3xl">📋</span>
                                                            </div>
                                                            <p className="text-gray-500 text-lg font-medium">Nenhuma venda recente</p>
                                                            <p className="text-gray-400 text-sm">As vendas aparecerão aqui assim que forem registradas</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            {/* Quick Actions */}
                            <div className="stat-card p-8 relative z-10">
                                <div className="flex items-center justify-between text-white">
                                    <div>
                                        <div className="flex items-center mb-3">
                                            <span className="text-3xl mr-3">⚡</span>
                                            <h4 className="text-2xl font-bold">Ações Rápidas</h4>
                                        </div>
                                        <p className="text-white/90 text-lg">Gerencie o sistema BBKits com facilidade</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <a 
                                            href="/admin/sales" 
                                            className="quick-action-btn px-6 py-3 text-sm font-semibold text-white rounded-2xl transition-all duration-300 hover:scale-105"
                                        >
                                            ✅ Aprovar Vendas
                                        </a>
                                        <a 
                                            href="/admin/reports" 
                                            className="quick-action-btn px-6 py-3 text-sm font-semibold text-white rounded-2xl transition-all duration-300 hover:scale-105"
                                        >
                                            📊 Ver Relatórios
                                        </a>
                                        <a 
                                            href={`/admin/export/sales?month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}`}
                                            className="quick-action-btn px-6 py-3 text-sm font-semibold text-white rounded-2xl transition-all duration-300 hover:scale-105"
                                        >
                                            📥 Exportar Excel
                                        </a>
                                        <a 
                                            href="/admin/commission-ranges" 
                                            className="quick-action-btn px-6 py-3 text-sm font-semibold text-white rounded-2xl transition-all duration-300 hover:scale-105"
                                        >
                                            💎 Comissões
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>

            {/* Font Awesome Icons */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            />
        </>
    );
}