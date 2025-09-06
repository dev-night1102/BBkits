import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function CommissionRanges({ auth, ranges }) {
    const [editingId, setEditingId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        min_amount: '',
        max_amount: '',
        percentage: '',
        order: '',
        active: true,
    });

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingId) {
            put(route('admin.commission-ranges.update', editingId), {
                onSuccess: () => {
                    toast.success('Faixa de comissão atualizada com sucesso!');
                    setEditingId(null);
                    reset();
                },
            });
        } else {
            post(route('admin.commission-ranges.store'), {
                onSuccess: () => {
                    toast.success('Faixa de comissão criada com sucesso!');
                    setShowAddForm(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (range) => {
        setEditingId(range.id);
        setShowAddForm(false);
        setData({
            min_amount: range.min_amount,
            max_amount: range.max_amount || '',
            percentage: range.percentage,
            order: range.order,
            active: range.active,
        });
    };

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja remover esta faixa de comissão?')) {
            router.delete(route('admin.commission-ranges.destroy', id), {
                onSuccess: () => toast.success('Faixa de comissão removida com sucesso!'),
            });
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setShowAddForm(false);
        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gerenciar Faixas de Comissão</h2>}
        >
            <Head title="Faixas de Comissão" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">Faixas de Comissão Ativas</h3>
                                {!showAddForm && !editingId && (
                                    <button
                                        onClick={() => setShowAddForm(true)}
                                        className="inline-flex items-center px-4 py-2 bg-pink-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-pink-700 focus:bg-pink-700 active:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        <PlusIcon className="w-5 h-5 mr-2" />
                                        Nova Faixa
                                    </button>
                                )}
                            </div>

                            {(showAddForm || editingId) && (
                                <form onSubmit={handleSubmit} className="mb-6 p-6 bg-gray-50 rounded-lg">
                                    <h4 className="text-md font-medium text-gray-900 mb-4">
                                        {editingId ? 'Editar Faixa de Comissão' : 'Adicionar Nova Faixa'}
                                    </h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Valor Mínimo (R$)
                                            </label>
                                            <input
                                                type="number"
                                                value={data.min_amount}
                                                onChange={e => setData('min_amount', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                                                required
                                                step="0.01"
                                            />
                                            {errors.min_amount && (
                                                <p className="mt-1 text-sm text-red-600">{errors.min_amount}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Valor Máximo (R$)
                                            </label>
                                            <input
                                                type="number"
                                                value={data.max_amount}
                                                onChange={e => setData('max_amount', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                                                step="0.01"
                                                placeholder="Deixe vazio para sem limite"
                                            />
                                            {errors.max_amount && (
                                                <p className="mt-1 text-sm text-red-600">{errors.max_amount}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Percentual (%)
                                            </label>
                                            <input
                                                type="number"
                                                value={data.percentage}
                                                onChange={e => setData('percentage', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                                                required
                                                step="0.01"
                                                min="0"
                                                max="100"
                                            />
                                            {errors.percentage && (
                                                <p className="mt-1 text-sm text-red-600">{errors.percentage}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Ordem
                                            </label>
                                            <input
                                                type="number"
                                                value={data.order}
                                                onChange={e => setData('order', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                                                placeholder="0"
                                            />
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={data.active}
                                                onChange={e => setData('active', e.target.checked)}
                                                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                                                id="active"
                                            />
                                            <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                                                Ativa
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center px-4 py-2 bg-pink-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-pink-700 focus:bg-pink-700 active:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            {processing ? 'Salvando...' : 'Salvar'}
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Faixa
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Percentual
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ordem
                                            </th>
                                            <th className="relative px-6 py-3">
                                                <span className="sr-only">Ações</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {ranges.map((range) => (
                                            <tr key={range.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {formatCurrency(range.min_amount)} - {range.max_amount ? formatCurrency(range.max_amount) : 'Sem limite'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {range.percentage}%
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        range.active 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {range.active ? 'Ativa' : 'Inativa'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {range.order}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(range)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        <PencilIcon className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(range.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}