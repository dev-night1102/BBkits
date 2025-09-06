import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import toast from 'react-hot-toast';

export default function OrdersIndex({ orders, statusFilter }) {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [paymentPreview, setPaymentPreview] = useState(null);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        order_id: null,
        action: 'approve', // 'approve', 'reject'
        rejection_reason: '',
        move_to_production: false
    });

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setData({
            order_id: order.id,
            action: 'approve',
            rejection_reason: '',
            move_to_production: false
        });
        setShowModal(true);
        
        // Load payment proof preview
        if (order.initial_payment_proof_data) {
            setPaymentPreview(order.initial_payment_proof_data);
        } else if (order.receipt_data) {
            setPaymentPreview(order.receipt_data);
        }
    };

    const handleApprove = () => {
        post(route('finance.orders.approve', selectedOrder.id), {
            onSuccess: () => {
                toast.success('Pedido aprovado com sucesso!');
                setShowModal(false);
                reset();
            }
        });
    };

    const handleReject = () => {
        if (!data.rejection_reason) {
            toast.error('Por favor, informe o motivo da rejeição');
            return;
        }
        
        setData('action', 'reject');
        post(route('finance.orders.reject', selectedOrder.id), {
            onSuccess: () => {
                toast.success('Pedido rejeitado');
                setShowModal(false);
                reset();
            }
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending_payment: 'bg-yellow-100 text-yellow-800',
            payment_approved: 'bg-green-100 text-green-800',
            in_production: 'bg-blue-100 text-blue-800',
            photo_sent: 'bg-purple-100 text-purple-800',
            photo_approved: 'bg-indigo-100 text-indigo-800',
            pending_final_payment: 'bg-orange-100 text-orange-800',
            ready_for_shipping: 'bg-teal-100 text-teal-800',
            shipped: 'bg-green-100 text-green-800'
        };
        
        const labels = {
            pending_payment: '⏳ Aguardando Pagamento',
            payment_approved: '✅ Pagamento Aprovado',
            in_production: '🏭 Em Produção',
            photo_sent: '📸 Foto Enviada',
            photo_approved: '✨ Foto Aprovada',
            pending_final_payment: '🟠 Pagamento Final Pendente',
            ready_for_shipping: '🔗 Pronto para Envio',
            shipped: '🎉 Enviado'
        };

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${badges[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('pt-BR');
    };

    const pendingPaymentOrders = orders.filter(order => order.order_status === 'pending_payment');
    const pendingFinalPaymentOrders = orders.filter(order => order.order_status === 'pending_final_payment' && order.final_payment_proof_data);

    return (
        <>
            <Head title="Gestão Financeira - Pedidos" />

            <AuthenticatedLayout
                header={
                    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold">
                            💰 Gestão Financeira
                        </h2>
                        <p className="text-green-100 mt-1">
                            Aprove pagamentos e gerencie o fluxo de pedidos
                        </p>
                    </div>
                }
            >
                <div className="py-12 bg-gray-50 min-h-screen">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Filter Tabs */}
                        <div className="bg-white rounded-lg shadow-md mb-6">
                            <div className="border-b border-gray-200">
                                <nav className="-mb-px flex space-x-8 px-6">
                                    <Link
                                        href={route('finance.orders.index')}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            !statusFilter || statusFilter === 'all' 
                                                ? 'border-green-500 text-green-600' 
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Todos ({orders.length})
                                    </Link>
                                    <Link
                                        href={route('finance.orders.index', { status: 'pending_payment' })}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            statusFilter === 'pending_payment'
                                                ? 'border-yellow-500 text-yellow-600' 
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Pagamento Inicial ({pendingPaymentOrders.length})
                                    </Link>
                                    <Link
                                        href={route('finance.orders.index', { status: 'pending_final_payment' })}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            statusFilter === 'pending_final_payment'
                                                ? 'border-orange-500 text-orange-600' 
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Pagamento Final ({pendingFinalPaymentOrders.length})
                                    </Link>
                                </nav>
                            </div>
                        </div>

                        {/* Orders Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {orders.map((order) => (
                                <div 
                                    key={order.id} 
                                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                                    onClick={() => handleOrderClick(order)}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {order.client_name}
                                            </h3>
                                            {getStatusBadge(order.order_status)}
                                        </div>
                                        
                                        <div className="space-y-2 mb-4">
                                            <p className="text-sm text-gray-600">
                                                <strong>Criança:</strong> {order.child_name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <strong>Vendedora:</strong> {order.user.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <strong>Data:</strong> {formatDate(order.created_at)}
                                            </p>
                                        </div>

                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-600">Valor Total:</span>
                                                <span className="font-semibold text-gray-900">
                                                    {formatCurrency(order.total_amount)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-600">Pago:</span>
                                                <span className="font-semibold text-green-600">
                                                    {formatCurrency(order.received_amount)}
                                                </span>
                                            </div>
                                            {(order.total_amount - order.received_amount) > 0 && (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Restante:</span>
                                                    <span className="font-semibold text-orange-600">
                                                        {formatCurrency(order.total_amount - order.received_amount)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {(order.order_status === 'pending_payment' || order.order_status === 'pending_final_payment') && (
                                            <div className="mt-4 text-center">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Requer Aprovação
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {orders.length === 0 && (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Nenhum pedido encontrado
                                </h3>
                                <p className="text-gray-500">
                                    Não há pedidos aguardando aprovação financeira no momento.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Details Modal */}
                {showModal && selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Aprovar Pedido - {selectedOrder.client_name}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-auto p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Order Details */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Detalhes do Pedido</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Cliente</label>
                                                <p className="text-gray-900">{selectedOrder.client_name}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">E-mail</label>
                                                <p className="text-gray-900">{selectedOrder.client_email || 'Não informado'}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Telefone</label>
                                                <p className="text-gray-900">{selectedOrder.client_phone || 'Não informado'}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Nome da Criança</label>
                                                <p className="text-gray-900">{selectedOrder.child_name}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Bordado</label>
                                                <p className="text-gray-900">
                                                    {selectedOrder.embroidery_color} • {selectedOrder.embroidery_font} • {selectedOrder.embroidery_position}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Vendedora</label>
                                                <p className="text-gray-900">{selectedOrder.user.name}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Data do Pedido</label>
                                                <p className="text-gray-900">{formatDate(selectedOrder.created_at)}</p>
                                            </div>
                                        </div>

                                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-2">Valores</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span>Valor Total:</span>
                                                    <span className="font-medium">{formatCurrency(selectedOrder.total_amount)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Frete:</span>
                                                    <span className="font-medium">{formatCurrency(selectedOrder.shipping_amount)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Valor Pago:</span>
                                                    <span className="font-medium text-green-600">{formatCurrency(selectedOrder.received_amount)}</span>
                                                </div>
                                                {(selectedOrder.total_amount - selectedOrder.received_amount) > 0 && (
                                                    <div className="flex justify-between border-t pt-2">
                                                        <span className="font-medium">Restante:</span>
                                                        <span className="font-medium text-orange-600">
                                                            {formatCurrency(selectedOrder.total_amount - selectedOrder.received_amount)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Proof */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">
                                            {selectedOrder.order_status === 'pending_final_payment' 
                                                ? 'Comprovante Pagamento Final' 
                                                : 'Comprovante de Pagamento'
                                            }
                                        </h3>
                                        {paymentPreview ? (
                                            <div className="border rounded-lg overflow-hidden">
                                                <img 
                                                    src={paymentPreview} 
                                                    alt="Comprovante de pagamento" 
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <p className="mt-2 text-sm text-gray-500">Nenhum comprovante anexado</p>
                                            </div>
                                        )}

                                        <div className="mt-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Motivo da rejeição (opcional)
                                            </label>
                                            <textarea
                                                value={data.rejection_reason}
                                                onChange={e => setData('rejection_reason', e.target.value)}
                                                rows={3}
                                                className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                                                placeholder="Descreva o motivo caso vá rejeitar o pedido..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-4 p-6 border-t bg-gray-50">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleReject}
                                    disabled={processing}
                                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Processando...' : 'Rejeitar'}
                                </button>
                                <button
                                    onClick={handleApprove}
                                    disabled={processing}
                                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Processando...' : 'Aprovar Pagamento'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </AuthenticatedLayout>
        </>
    );
}