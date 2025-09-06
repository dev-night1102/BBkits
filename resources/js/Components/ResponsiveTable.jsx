import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export default function ResponsiveTable({ data, columns, keyField = 'id' }) {
    const [expandedRows, setExpandedRows] = useState([]);

    const toggleRow = (rowId) => {
        setExpandedRows(prev => 
            prev.includes(rowId) 
                ? prev.filter(id => id !== rowId)
                : [...prev, rowId]
        );
    };

    return (
        <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-pink-50 to-purple-50">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((row, rowIndex) => (
                            <tr 
                                key={row[keyField]} 
                                className="hover:bg-gray-50 transition-colors duration-200"
                                style={{ animationDelay: `${rowIndex * 0.05}s` }}
                            >
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        {column.render ? column.render(row) : row[column.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {data.map((row, index) => (
                    <div
                        key={row[keyField]}
                        className="bg-white rounded-xl shadow-md overflow-hidden animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        {/* Card Header - Always visible */}
                        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    {columns.slice(0, 2).map((column, idx) => (
                                        <div key={idx} className="mb-2">
                                            <span className="text-xs text-gray-600 uppercase font-semibold">
                                                {column.header}:
                                            </span>
                                            <div className="text-sm font-medium text-gray-900 mt-1">
                                                {column.render ? column.render(row) : row[column.accessor]}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => toggleRow(row[keyField])}
                                    className="ml-4 p-2 rounded-full hover:bg-white/50 transition-colors duration-200"
                                >
                                    {expandedRows.includes(row[keyField]) ? (
                                        <ChevronUpIcon className="h-5 w-5 text-gray-600" />
                                    ) : (
                                        <ChevronDownIcon className="h-5 w-5 text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Card Body - Expandable */}
                        {expandedRows.includes(row[keyField]) && (
                            <div className="px-4 py-3 bg-gray-50 space-y-3 animate-slideDown">
                                {columns.slice(2).map((column, idx) => (
                                    <div key={idx} className="flex justify-between items-start">
                                        <span className="text-xs text-gray-600 uppercase font-semibold">
                                            {column.header}:
                                        </span>
                                        <div className="text-sm text-gray-900 text-right ml-2">
                                            {column.render ? column.render(row) : row[column.accessor]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Quick actions for important columns */}
                        {columns.some(col => col.mobileQuickView) && (
                            <div className="px-4 py-2 bg-white border-t border-gray-100 flex justify-between items-center">
                                {columns.filter(col => col.mobileQuickView).map((column, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-xs text-gray-500">{column.header}</div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            {column.render ? column.render(row) : row[column.accessor]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        max-height: 0;
                    }
                    to {
                        opacity: 1;
                        max-height: 500px;
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out forwards;
                    opacity: 0;
                }

                .animate-slideDown {
                    animation: slideDown 0.3s ease-out forwards;
                }
            `}</style>
        </>
    );
}