import GuestLayout from '@/Layouts/GuestLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PendingApproval() {
    const [checking, setChecking] = useState(false);
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        // Check approval status every 10 seconds
        const checkApproval = async () => {
            if (checking) return;
            
            setChecking(true);
            try {
                const response = await axios.get('/api/check-approval-status');
                if (response.data.approved) {
                    // User has been approved, redirect to dashboard
                    router.visit('/dashboard');
                }
            } catch (error) {
                console.error('Error checking approval status:', error);
            } finally {
                setChecking(false);
            }
        };

        // Initial check
        checkApproval();

        // Set up interval for periodic checks
        const interval = setInterval(() => {
            checkApproval();
            setCountdown(10); // Reset countdown
        }, 10000);

        // Countdown timer
        const countdownInterval = setInterval(() => {
            setCountdown(prev => prev > 0 ? prev - 1 : 10);
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(countdownInterval);
        };
    }, [checking]);

    return (
        <GuestLayout>
            <Head title="Aguardando Aprovação" />

            <div className="text-center">
                <div className="mb-6">
                    <div className="mx-auto h-20 w-20 rounded-full bg-yellow-100 flex items-center justify-center">
                        <span className="text-3xl">⏳</span>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Conta Aguardando Aprovação
                </h1>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <p className="text-gray-700 mb-4">
                        Sua conta foi criada com sucesso! No entanto, você precisa aguardar a aprovação de um administrador para acessar o sistema de vendas.
                    </p>
                    
                    <p className="text-gray-600 text-sm mb-4">
                        Esta medida garante a segurança e qualidade do nosso sistema. Você receberá uma notificação assim que sua conta for aprovada.
                    </p>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800 text-sm font-medium">
                            💡 Dica: Enquanto aguarda, entre em contato com seu supervisor ou administrador para acelerar o processo de aprovação.
                        </p>
                    </div>

                    <div className="mt-4 text-sm text-gray-500">
                        {checking ? (
                            <span>Verificando status de aprovação...</span>
                        ) : (
                            <span>Próxima verificação em {countdown} segundos</span>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <form method="POST" action="/logout" className="inline">
                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')} />
                        <button type="submit" className="text-blue-600 hover:text-blue-500 font-medium">
                            Fazer logout
                        </button>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}