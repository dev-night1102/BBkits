import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Meu Perfil - BBKits" />

            {/* Add custom styles matching the standard design */}
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

                .profile-bg {
                    background: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 50%, #F0F9FF 100%);
                    min-height: 100vh;
                }

                .card-gradient {
                    background: var(--gradient-soft);
                    border-radius: 25px;
                    box-shadow: var(--shadow);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 2px solid transparent;
                    backdrop-filter: blur(10px);
                    margin-bottom: 32px;
                    overflow: hidden;
                }

                .card-gradient:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-hover);
                    border-color: var(--primary-color);
                }

                .profile-section {
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    margin-bottom: 24px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .profile-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: var(--gradient);
                }

                .profile-section:hover {
                    border-color: rgba(212, 165, 116, 0.3);
                    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
                    transform: translateY(-5px);
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 32px;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #F3F4F6;
                }

                .section-icon {
                    width: 48px;
                    height: 48px;
                    background: var(--gradient);
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 20px;
                    box-shadow: 0 8px 20px rgba(212, 165, 116, 0.3);
                }

                .section-title {
                    flex: 1;
                }

                .section-title h3 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-dark);
                    margin: 0 0 4px 0;
                }

                .section-title p {
                    color: var(--text-light);
                    margin: 0;
                    font-size: 0.9rem;
                }

                .floating-particles {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 1;
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

                .header-gradient {
                    background: var(--gradient);
                    color: white;
                    border-radius: 20px;
                    padding: 24px;
                    margin-bottom: 30px;
                    box-shadow: var(--shadow);
                    position: relative;
                    overflow: hidden;
                }

                .header-gradient::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="white" opacity="0.1"/><circle cx="80" cy="40" r="1" fill="white" opacity="0.1"/><circle cx="40" cy="80" r="1.5" fill="white" opacity="0.1"/></svg>');
                    animation: sparkle 20s linear infinite;
                }

                @keyframes sparkle {
                    0% { transform: translateY(0) rotate(0deg); }
                    100% { transform: translateY(-100px) rotate(360deg); }
                }

                .profile-intro {
                    background: linear-gradient(135deg, #EBF8FF 0%, #DBEAFE 100%);
                    border: 2px solid #93C5FD;
                    border-radius: 20px;
                    padding: 24px;
                    margin-bottom: 32px;
                    position: relative;
                    overflow: hidden;
                }

                .profile-intro::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
                    animation: pulse 4s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.1); opacity: 0.3; }
                }

                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slide-in-left {
                    animation: slideInLeft 0.6s ease-out;
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .animate-slide-in-right {
                    animation: slideInRight 0.6s ease-out;
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .security-highlight {
                    background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
                    border: 2px solid #F59E0B;
                    border-radius: 15px;
                    padding: 16px;
                    margin-bottom: 20px;
                }

                .danger-highlight {
                    background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
                    border: 2px solid #EF4444;
                    border-radius: 15px;
                    padding: 16px;
                    margin-bottom: 20px;
                }

                .section-divider {
                    height: 2px;
                    background: var(--gradient);
                    border-radius: 1px;
                    margin: 32px 0;
                    opacity: 0.3;
                }

                .profile-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 16px;
                    margin-bottom: 32px;
                }

                .stat-card {
                    background: linear-gradient(135deg, rgba(212, 165, 116, 0.1) 0%, rgba(232, 180, 203, 0.1) 100%);
                    border: 2px solid rgba(212, 165, 116, 0.2);
                    border-radius: 15px;
                    padding: 20px;
                    text-align: center;
                    transition: all 0.3s ease;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(212, 165, 116, 0.2);
                }

                .stat-icon {
                    width: 40px;
                    height: 40px;
                    background: var(--gradient);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 12px;
                    color: white;
                    font-size: 18px;
                }

                .motivational-quote {
                    background: var(--gradient);
                    border-radius: 20px;
                    padding: 24px;
                    color: white;
                    text-align: center;
                    margin-bottom: 32px;
                    position: relative;
                    overflow: hidden;
                }

                .motivational-quote::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="white" opacity="0.1"/><circle cx="80" cy="40" r="1" fill="white" opacity="0.1"/><circle cx="40" cy="80" r="1.5" fill="white" opacity="0.1"/></svg>');
                    animation: sparkle 20s linear infinite;
                }

                /* Enhanced form styling for nested components */
                .profile-section .max-w-xl {
                    max-width: 100% !important;
                }

                .profile-section input,
                .profile-section select,
                .profile-section textarea {
                    border-radius: 12px !important;
                    border: 2px solid #E5E7EB !important;
                    padding: 12px 16px !important;
                    transition: all 0.3s ease !important;
                    font-weight: 500 !important;
                }

                .profile-section input:focus,
                .profile-section select:focus,
                .profile-section textarea:focus {
                    border-color: var(--primary-color) !important;
                    box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.1) !important;
                    transform: translateY(-2px) !important;
                }

                .profile-section button {
                    border-radius: 12px !important;
                    font-weight: 600 !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.5px !important;
                    transition: all 0.3s ease !important;
                }

                .profile-section button:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
                }
            `}</style>

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

            <AuthenticatedLayout
                header={
                    <div className="header-gradient">
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl backdrop-blur-sm">
                                <i className="fas fa-user-edit"></i>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold leading-tight">
                                    👤 Meu Perfil
                                </h2>
                                <p className="text-white/80 text-lg">
                                    Gerencie suas informações pessoais e configurações de conta
                                </p>
                            </div>
                        </div>
                    </div>
                }
            >
                <div className="profile-bg relative z-10">
                    <div className="py-12">
                        <div className="mx-auto max-w-6xl space-y-0 sm:px-6 lg:px-8">
                            
                            {/* Profile Introduction */}
                            <div className="profile-intro animate-fade-in">
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                        ✨
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            Bem-vinda à sua área pessoal! 🌟
                                        </h3>
                                        <p className="text-gray-600">
                                            Aqui você pode atualizar suas informações, alterar sua senha e gerenciar sua conta com segurança.
                                            Mantenha seus dados sempre atualizados para uma melhor experiência! 💪
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Motivational Quote */}
                            <div className="motivational-quote animate-fade-in">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-3">
                                        "Cada conquista começa com a decisão de tentar" ✨
                                    </h3>
                                    <div className="flex justify-center items-center gap-3 text-2xl mb-3">
                                        <span>💼</span>
                                        <span>👑</span>
                                        <span>🎯</span>
                                        <span>🌟</span>
                                    </div>
                                    <p className="text-white/90 text-lg">
                                        Continue sendo incrível, vendedora BBKits!
                                    </p>
                                </div>
                            </div>

                            {/* Profile Information */}
                            <div className="profile-section animate-slide-in-left">
                                <div className="section-header">
                                    <div className="section-icon">
                                        <i className="fas fa-user-circle"></i>
                                    </div>
                                    <div className="section-title">
                                        <h3>👤 Informações Pessoais</h3>
                                        <p>Atualize seus dados pessoais e informações de contato</p>
                                    </div>
                                </div>

                                {status && (
                                    <div className="security-highlight mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                                                ✓
                                            </div>
                                            <p className="font-semibold text-yellow-800">
                                                {status === 'profile-updated' && '✅ Perfil atualizado com sucesso!'}
                                                {status === 'password-updated' && '🔒 Senha atualizada com sucesso!'}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>

                            <div className="section-divider"></div>

                            {/* Password Update */}
                            <div className="profile-section animate-slide-in-right">
                                <div className="section-header">
                                    <div className="section-icon">
                                        <i className="fas fa-shield-alt"></i>
                                    </div>
                                    <div className="section-title">
                                        <h3>🔒 Segurança da Conta</h3>
                                        <p>Altere sua senha para manter sua conta sempre segura</p>
                                    </div>
                                </div>

                                <div className="security-highlight">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                                            🛡️
                                        </div>
                                        <div>
                                            <p className="font-semibold text-yellow-800 mb-1">
                                                Dica de Segurança
                                            </p>
                                            <p className="text-yellow-700 text-sm">
                                                Use uma senha forte com pelo menos 8 caracteres, incluindo letras, números e símbolos.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <UpdatePasswordForm className="max-w-xl" />
                            </div>

                            <div className="section-divider"></div>

                            {/* Account Deletion */}
                            <div className="profile-section animate-fade-in" style={{ animationDelay: '0.4s' }}>
                                <div className="section-header">
                                    <div className="section-icon" style={{ background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' }}>
                                        <i className="fas fa-exclamation-triangle"></i>
                                    </div>
                                    <div className="section-title">
                                        <h3>⚠️ Zona de Perigo</h3>
                                        <p>Exclusão permanente da conta - esta ação não pode ser desfeita</p>
                                    </div>
                                </div>

                                <div className="danger-highlight">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                                            ⚠️
                                        </div>
                                        <div>
                                            <p className="font-semibold text-red-800 mb-1">
                                                Atenção: Ação Irreversível
                                            </p>
                                            <p className="text-red-700 text-sm">
                                                A exclusão da conta é permanente e todos os seus dados serão perdidos.
                                                Certifique-se de que realmente deseja prosseguir.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <DeleteUserForm className="max-w-xl" />
                            </div>

                            {/* Footer Motivation */}
                            <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 animate-fade-in">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white text-xl">
                                        🎯
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">
                                            Sua jornada de sucesso continua! 🚀
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Manter seus dados atualizados é essencial para o bom funcionamento do sistema.
                                            Continue focada nos seus objetivos - você está no caminho certo! ✨
                                        </p>
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