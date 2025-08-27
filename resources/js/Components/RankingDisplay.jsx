import React, { useState } from 'react';
import { Trophy, TrendingUp, Crown, Medal, Target, Users, ChevronDown, ChevronUp } from 'lucide-react';

export default function RankingDisplay({ ranking, currentUser, showFull = false }) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const displayRanking = showFull ? ranking : ranking.slice(0, 3);
    const currentUserRanking = ranking.find(r => r.user.id === currentUser.id);
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    };

    const getPositionIcon = (position) => {
        switch (position) {
            case 1:
                return <Crown className="w-6 h-6 text-yellow-500" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-500" />;
            case 3:
                return <Medal className="w-6 h-6 text-orange-500" />;
            default:
                return <Trophy className="w-6 h-6 text-blue-500" />;
        }
    };

    const getPositionAnimation = (position) => {
        switch (position) {
            case 1:
                return 'animate-pulse';
            case 2:
                return 'animate-bounce';
            case 3:
                return 'animate-ping';
            default:
                return '';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Trophy className="w-6 h-6" />
                            Ranking do Mês
                        </h3>
                        <p className="text-purple-100 text-sm">
                            {ranking.length} vendedoras ativas
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">🏆</div>
                        <div className="text-sm text-purple-100">
                            {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Current User Position (if not in top 3) */}
            {currentUserRanking && currentUserRanking.position > 3 && (
                <div className="p-4 bg-blue-50 border-b border-blue-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentUserRanking.badge.bg_color} ${currentUserRanking.badge.border_color} border-2`}>
                                <span className="text-lg">{currentUserRanking.badge.icon}</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-blue-800">Sua Posição: {currentUserRanking.position}º</span>
                                    <span className="text-sm text-blue-600">(Você)</span>
                                </div>
                                <div className="text-sm text-blue-600">
                                    {formatCurrency(currentUserRanking.monthly_total)}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-medium text-blue-700">
                                {currentUserRanking.motivational_message.title}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Turnaround Alert */}
            {currentUserRanking?.turnaround_alert?.show && (
                <div className={`p-4 ${currentUserRanking.turnaround_alert.bg_color} border-b ${currentUserRanking.turnaround_alert.border_color} border-2`}>
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            <span className="text-2xl">{currentUserRanking.turnaround_alert.icon}</span>
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-green-800 mb-1">
                                {currentUserRanking.turnaround_alert.title}
                            </div>
                            <div className="text-sm text-green-700 mb-2">
                                {currentUserRanking.turnaround_alert.message}
                            </div>
                            <div className="text-xs text-green-600 italic">
                                {currentUserRanking.turnaround_alert.encouragement}
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Target className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                </div>
            )}

            {/* Ranking List */}
            <div className="divide-y divide-gray-200">
                {displayRanking.map((item, index) => {
                    const isCurrentUser = item.user.id === currentUser.id;
                    const position = item.position;
                    
                    return (
                        <div
                            key={item.user.id}
                            className={`p-4 transition-all duration-200 ${
                                isCurrentUser 
                                    ? 'bg-blue-50 border-l-4 border-blue-500' 
                                    : 'hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    {/* Position Badge */}
                                    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center ${item.badge.bg_color} ${item.badge.border_color} border-2 ${getPositionAnimation(position)}`}>
                                        <span className="text-xl">{item.badge.icon}</span>
                                        {position <= 3 && (
                                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
                                                {getPositionIcon(position)}
                                            </div>
                                        )}
                                    </div>

                                    {/* User Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-800">
                                                {item.user.name}
                                            </span>
                                            {isCurrentUser && (
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                    Você
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {item.badge.title}
                                        </div>
                                    </div>
                                </div>

                                {/* Performance Stats */}
                                <div className="text-right">
                                    <div className="font-bold text-lg text-gray-800">
                                        {formatCurrency(item.monthly_total)}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {item.monthly_sales_count} vendas
                                    </div>
                                    <div className={`text-xs font-medium ${item.badge.color}`}>
                                        {item.level.level}
                                    </div>
                                </div>
                            </div>

                            {/* Motivational Message for Current User */}
                            {isCurrentUser && (
                                <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-2xl">{item.motivational_message.emoji}</span>
                                        <div>
                                            <div className="font-bold text-purple-800 mb-1">
                                                {item.motivational_message.title}
                                            </div>
                                            <div className="text-sm text-purple-700">
                                                {item.motivational_message.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Expand/Collapse Button */}
            {!showFull && ranking.length > 3 && (
                <div className="p-4 bg-gray-50 border-t">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <Users className="w-4 h-4" />
                        {isExpanded ? (
                            <>
                                Mostrar menos
                                <ChevronUp className="w-4 h-4" />
                            </>
                        ) : (
                            <>
                                Ver ranking completo ({ranking.length} vendedoras)
                                <ChevronDown className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Expanded Ranking */}
            {isExpanded && (
                <div className="divide-y divide-gray-200 border-t">
                    {ranking.slice(3).map((item) => {
                        const isCurrentUser = item.user.id === currentUser.id;
                        
                        return (
                            <div
                                key={item.user.id}
                                className={`p-3 ${
                                    isCurrentUser 
                                        ? 'bg-blue-50 border-l-4 border-blue-500' 
                                        : 'hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.badge.bg_color} ${item.badge.border_color} border`}>
                                            <span className="text-sm">{item.badge.icon}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-800">
                                                    {item.position}º {item.user.name}
                                                </span>
                                                {isCurrentUser && (
                                                    <span className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">
                                                        Você
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-gray-800">
                                            {formatCurrency(item.monthly_total)}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {item.monthly_sales_count} vendas
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                        <TrendingUp className="w-4 h-4 inline mr-1" />
                        Atualizado em tempo real
                    </div>
                    <div>
                        💪 Vamos conquistar juntas!
                    </div>
                </div>
            </div>
        </div>
    );
}