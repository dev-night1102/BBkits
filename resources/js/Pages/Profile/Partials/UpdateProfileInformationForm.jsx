import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <>
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
                    --gradient-success: linear-gradient(135deg, #10B981 0%, #059669 100%);
                    --gradient-warning: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
                    --gradient-info: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
                    --shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    --shadow-hover: 0 25px 50px rgba(0, 0, 0, 0.2);
                    --shadow-glow: 0 0 30px rgba(212, 165, 116, 0.3);
                    --shadow-success: 0 0 30px rgba(16, 185, 129, 0.3);
                    --shadow-warning: 0 0 30px rgba(245, 158, 11, 0.3);
                }

                * {
                    font-family: 'Poppins', sans-serif;
                }

                .profile-form-container {
                    background: var(--gradient-soft);
                    border-radius: 25px;
                    box-shadow: var(--shadow);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 2px solid transparent;
                    animation: fadeInUp 0.6s ease-out;
                    position: relative;
                    overflow: hidden;
                }

                .profile-form-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="1" fill="rgba(212,165,116,0.1)"/><circle cx="80" cy="40" r="0.5" fill="rgba(212,165,116,0.1)"/><circle cx="40" cy="80" r="1.5" fill="rgba(212,165,116,0.1)"/></svg>');
                    animation: sparkle 20s linear infinite;
                    pointer-events: none;
                }

                @keyframes sparkle {
                    0% { transform: translateY(0) rotate(0deg); }
                    100% { transform: translateY(-100px) rotate(360deg); }
                }

                .profile-form-container:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-hover);
                    border-color: var(--primary-color);
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .header-title {
                    background: var(--gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: titleGlow 3s ease-in-out infinite alternate;
                }

                @keyframes titleGlow {
                    0% { filter: drop-shadow(0 0 5px rgba(212, 165, 116, 0.3)); }
                    100% { filter: drop-shadow(0 0 15px rgba(212, 165, 116, 0.6)); }
                }

                .input-group {
                    position: relative;
                    animation: slideInLeft 0.6s ease-out;
                    animation-fill-mode: backwards;
                }

                .input-group:nth-child(1) { animation-delay: 0.1s; }
                .input-group:nth-child(2) { animation-delay: 0.2s; }

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

                .input-gradient {
                    background: rgba(255, 255, 255, 0.9);
                    border: 2px solid var(--primary-color);
                    border-radius: 15px;
                    transition: all 0.3s ease;
                    box-shadow: var(--shadow);
                    padding: 12px 16px;
                    font-size: 16px;
                    position: relative;
                }

                .input-gradient:focus {
                    box-shadow: var(--shadow-glow);
                    border-color: var(--accent-color);
                    transform: scale(1.02);
                    background: white;
                }

                .input-gradient:hover {
                    border-color: var(--accent-color);
                    box-shadow: var(--shadow-hover);
                }

                .label-gradient {
                    color: var(--text-dark);
                    font-weight: 600;
                    font-size: 16px;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .btn-primary-gradient {
                    background: var(--gradient);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    border: none;
                    border-radius: 15px;
                    box-shadow: var(--shadow);
                    padding: 12px 32px;
                    font-size: 18px;
                    font-weight: 600;
                    color: white;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .btn-primary-gradient::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.6s;
                }

                .btn-primary-gradient:hover::before {
                    left: 100%;
                }

                .btn-primary-gradient:hover {
                    transform: translateY(-3px);
                    box-shadow: var(--shadow-hover);
                }

                .btn-primary-gradient:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                .success-message {
                    background: var(--gradient-success);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 15px;
                    font-weight: 600;
                    box-shadow: var(--shadow-success);
                    animation: successPulse 0.6s ease-out;
                }

                @keyframes successPulse {
                    0% {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .verification-card {
                    background: var(--gradient-warning);
                    border-radius: 20px;
                    padding: 20px;
                    margin: 20px 0;
                    color: white;
                    box-shadow: var(--shadow-warning);
                    animation: slideInRight 0.6s 0.3s ease-out;
                    animation-fill-mode: backwards;
                    position: relative;
                    overflow: hidden;
                }

                .verification-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
                    animation: shimmer 3s ease-in-out infinite;
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
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

                .verification-link {
                    color: white;
                    text-decoration: underline;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    padding: 8px 16px;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.1);
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 8px;
                }

                .verification-link:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: scale(1.05);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }

                .verification-success {
                    background: var(--gradient-info);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 15px;
                    font-weight: 600;
                    margin-top: 12px;
                    animation: successSlide 0.6s ease-out;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                @keyframes successSlide {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .floating-particles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: -1;
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

                .profile-icon {
                    background: var(--gradient);
                    animation: iconPulse 2s ease-in-out infinite;
                }

                @keyframes iconPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .form-actions {
                    animation: slideInUp 0.6s 0.4s ease-out;
                    animation-fill-mode: backwards;
                }

                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            <section className={`${className} relative`}>
                {/* Floating particles */}
                <div className="floating-particles">
                    {Array.from({ length: 8 }, (_, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={{
                                left: Math.random() * 100 + "%",
                                width: Math.random() * 6 + 3 + "px",
                                height: Math.random() * 6 + 3 + "px",
                                animationDelay: Math.random() * 15 + "s",
                                animationDuration: Math.random() * 10 + 10 + "s",
                            }}
                        />
                    ))}
                </div>

                <div className="profile-form-container p-8 relative z-10">
                    <header className="text-center mb-8">
                        <div className="w-16 h-16 profile-icon mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg">
                            <i className="fas fa-user-edit text-white text-2xl"></i>
                        </div>
                        
                        <h2 className="text-3xl font-bold header-title mb-3">
                            Informações do Perfil
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Atualize as informações do perfil da sua conta e endereço de e-mail.
                        </p>
                    </header>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="input-group">
                            <label className="label-gradient">
                                <i className="fas fa-user text-lg"></i>
                                Nome
                            </label>

                            <input
                                id="name"
                                className="input-gradient w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoFocus
                                autoComplete="name"
                                placeholder="Digite seu nome completo"
                            />

                            {errors.name && (
                                <p className="mt-2 text-red-500 font-medium flex items-center gap-2">
                                    <i className="fas fa-exclamation-circle"></i>
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="input-group">
                            <label className="label-gradient">
                                <i className="fas fa-envelope text-lg"></i>
                                E-mail
                            </label>

                            <input
                                id="email"
                                type="email"
                                className="input-gradient w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Digite seu endereço de e-mail"
                            />

                            {errors.email && (
                                <p className="mt-2 text-red-500 font-medium flex items-center gap-2">
                                    <i className="fas fa-exclamation-circle"></i>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div className="verification-card relative z-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <i className="fas fa-exclamation-triangle text-2xl"></i>
                                    <h3 className="font-bold text-lg">E-mail não verificado</h3>
                                </div>
                                
                                <p className="mb-4">
                                    Seu endereço de e-mail não foi verificado. Para ter acesso completo 
                                    ao sistema, você precisa verificar seu e-mail.
                                </p>

                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="verification-link"
                                >
                                    <i className="fas fa-paper-plane"></i>
                                    Reenviar e-mail de verificação
                                </Link>

                                {status === 'verification-link-sent' && (
                                    <div className="verification-success">
                                        <i className="fas fa-check-circle"></i>
                                        Um novo link de verificação foi enviado para seu e-mail!
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="form-actions flex items-center gap-6 justify-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary-gradient"
                            >
                                {processing ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-save mr-2"></i>
                                        Salvar Perfil
                                    </>
                                )}
                            </button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <div className="success-message flex items-center gap-2">
                                    <i className="fas fa-check-circle"></i>
                                    Perfil atualizado com sucesso!
                                </div>
                            </Transition>
                        </div>
                    </form>
                </div>

                {/* Font Awesome Icons */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
            </section>
        </>
    );
}