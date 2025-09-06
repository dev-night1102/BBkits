import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ stats, recent_approvals }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('pt-BR');
    };

    return (
        <>
            <Head title="Dashboard Financeiro" />

            <AuthenticatedLayout
                header={
                    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold">
                            💰 Dashboard Financeiro
                        </h2>
                        <p className="text-green-100 mt-1">
                            Visão geral das aprovações de pagamento
                        </p>
                    </div>
                }
            >
                <div className="py-12 bg-gray-50 min-h-screen">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                            <span className="text-yellow-600 text-lg">⏳</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Pagamentos Pendentes</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.pending_payments}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <span className="text-orange-600 text-lg">🟠</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Pagamentos Finais</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.pending_final_payments}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                            <span className="text-green-600 text-lg">✅</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Aprovações Recentes</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.recent_approvals_count}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <span className="text-blue-600 text-lg">💎</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Valor Total Pendente</p>
                                        <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.total_pending_value)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={route('finance.orders.index', { status: 'pending_payment' })}
                                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
                                >
                                    <span>⏳</span>
                                    Revisar Pagamentos Iniciais
                                </Link>
                                <Link
                                    href={route('finance.orders.index', { status: 'pending_final_payment' })}
                                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                                >
                                    <span>🟠</span>
                                    Revisar Pagamentos Finais
                                </Link>
                                <Link
                                    href={route('finance.orders.index')}
                                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                                >
                                    <span>📋</span>
                                    Ver Todos os Pedidos
                                </Link>
                            </div>
                        </div>

                        {/* Recent Approvals */}
                        {recent_approvals && recent_approvals.length > 0 && (
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">Aprovações Recentes (7 dias)</h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {recent_approvals.map((approval) => (
                                            <div key={approval.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">
                                                                {approval.client_name} - {approval.child_name}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Vendedora: {approval.user.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900">
                                                        {formatCurrency(approval.total_amount)}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {formatDate(approval.initial_payment_approved_at)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Empty State */}
                        {(!recent_approvals || recent_approvals.length === 0) && (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Nenhuma aprovação recente
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Quando você aprovar pagamentos, eles aparecerão aqui.
                                </p>
                                <Link
                                    href={route('finance.orders.index')}
                                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Ver Pedidos Pendentes
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}