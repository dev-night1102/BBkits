import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
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
                    --shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    --shadow-hover: 0 25px 50px rgba(0, 0, 0, 0.2);
                    --shadow-glow: 0 0 30px rgba(212, 165, 116, 0.3);
                    --shadow-success: 0 0 30px rgba(16, 185, 129, 0.3);
                }

                * {
                    font-family: 'Poppins', sans-serif;
                }

                .password-form-container {
                    background: var(--gradient-soft);
                    border-radius: 25px;
                    box-shadow: var(--shadow);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 2px solid transparent;
                    animation: fadeInUp 0.6s ease-out;
                    position: relative;
                    overflow: hidden;
                }

                .password-form-container::before {
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

                .password-form-container:hover {
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
                .input-group:nth-child(3) { animation-delay: 0.3s; }

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

                .security-icon {
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

                <div className="password-form-container p-8 relative z-10">
                    <header className="text-center mb-8">
                        <div className="w-16 h-16 security-icon mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg">
                            <i className="fas fa-shield-alt text-white text-2xl"></i>
                        </div>
                        
                        <h2 className="text-3xl font-bold header-title mb-3">
                            Atualizar Senha
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Certifique-se de que sua conta está usando uma senha longa e aleatória 
                            para permanecer segura.
                        </p>
                    </header>

                    <form onSubmit={updatePassword} className="space-y-6">
                        <div className="input-group">
                            <label className="label-gradient">
                                <i className="fas fa-lock text-lg"></i>
                                Senha Atual
                            </label>

                            <input
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) =>
                                    setData('current_password', e.target.value)
                                }
                                type="password"
                                className="input-gradient w-full"
                                autoComplete="current-password"
                                placeholder="Digite sua senha atual"
                            />

                            {errors.current_password && (
                                <p className="mt-2 text-red-500 font-medium flex items-center gap-2">
                                    <i className="fas fa-exclamation-circle"></i>
                                    {errors.current_password}
                                </p>
                            )}
                        </div>

                        <div className="input-group">
                            <label className="label-gradient">
                                <i className="fas fa-key text-lg"></i>
                                Nova Senha
                            </label>

                            <input
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="input-gradient w-full"
                                autoComplete="new-password"
                                placeholder="Digite sua nova senha"
                            />

                            {errors.password && (
                                <p className="mt-2 text-red-500 font-medium flex items-center gap-2">
                                    <i className="fas fa-exclamation-circle"></i>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="input-group">
                            <label className="label-gradient">
                                <i className="fas fa-check-double text-lg"></i>
                                Confirmar Senha
                            </label>

                            <input
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                type="password"
                                className="input-gradient w-full"
                                autoComplete="new-password"
                                placeholder="Confirme sua nova senha"
                            />

                            {errors.password_confirmation && (
                                <p className="mt-2 text-red-500 font-medium flex items-center gap-2">
                                    <i className="fas fa-exclamation-circle"></i>
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

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
                                        Salvar Senha
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
                                    Senha atualizada com sucesso!
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