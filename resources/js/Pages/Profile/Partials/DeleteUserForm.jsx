import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
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
                    --gradient-danger: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
                    --shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    --shadow-hover: 0 25px 50px rgba(0, 0, 0, 0.2);
                    --shadow-glow: 0 0 30px rgba(212, 165, 116, 0.3);
                    --shadow-danger: 0 0 30px rgba(239, 68, 68, 0.3);
                }

                * {
                    font-family: 'Poppins', sans-serif;
                }

                .delete-form-container {
                    background: var(--gradient-soft);
                    border-radius: 25px;
                    box-shadow: var(--shadow);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 2px solid transparent;
                    animation: fadeInUp 0.6s ease-out;
                }

                .delete-form-container:hover {
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

                .btn-danger-gradient {
                    background: var(--gradient-danger);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    border: none;
                    border-radius: 15px;
                    box-shadow: var(--shadow);
                }

                .btn-danger-gradient::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.6s;
                }

                .btn-danger-gradient:hover::before {
                    left: 100%;
                }

                .btn-danger-gradient:hover {
                    transform: translateY(-3px);
                    box-shadow: var(--shadow-danger);
                }

                .btn-secondary-gradient {
                    background: var(--gradient-soft);
                    border: 2px solid var(--primary-color);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 15px;
                    box-shadow: var(--shadow);
                }

                .btn-secondary-gradient:hover {
                    transform: translateY(-3px);
                    box-shadow: var(--shadow-hover);
                    background: var(--gradient);
                    color: white;
                }

                .input-gradient {
                    background: rgba(255, 255, 255, 0.9);
                    border: 2px solid var(--primary-color);
                    border-radius: 15px;
                    transition: all 0.3s ease;
                    box-shadow: var(--shadow);
                }

                .input-gradient:focus {
                    box-shadow: var(--shadow-glow);
                    border-color: var(--accent-color);
                    transform: scale(1.02);
                }

                .modal-backdrop {
                    backdrop-filter: blur(10px);
                    background: rgba(0, 0, 0, 0.5);
                }

                .modal-content {
                    background: var(--gradient-soft);
                    border-radius: 25px;
                    box-shadow: var(--shadow-hover);
                    border: 2px solid var(--primary-color);
                    animation: modalSlideIn 0.4s ease-out;
                }

                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                .warning-icon {
                    color: #EF4444;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
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
            `}</style>

            <section className={`space-y-6 ${className} relative`}>
                {/* Floating particles */}
                <div className="floating-particles">
                    {Array.from({ length: 10 }, (_, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={{
                                left: Math.random() * 100 + "%",
                                width: Math.random() * 8 + 3 + "px",
                                height: Math.random() * 8 + 3 + "px",
                                animationDelay: Math.random() * 15 + "s",
                                animationDuration: Math.random() * 10 + 10 + "s",
                            }}
                        />
                    ))}
                </div>

                <div className="delete-form-container p-8 relative z-10">
                    <header className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                            <i className="fas fa-exclamation-triangle text-white text-2xl warning-icon"></i>
                        </div>
                        
                        <h2 className="text-3xl font-bold header-title mb-3">
                            Excluir Conta
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Uma vez que sua conta for excluída, todos os seus recursos e dados serão 
                            permanentemente deletados. Antes de excluir sua conta, faça o download 
                            de quaisquer dados ou informações que você deseja manter.
                        </p>
                    </header>

                    <div className="text-center">
                        <button
                            onClick={confirmUserDeletion}
                            className="btn-danger-gradient text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition duration-300 uppercase tracking-wide"
                        >
                            <i className="fas fa-trash mr-3"></i>
                            Excluir Conta
                        </button>
                    </div>
                </div>

                <Modal 
                    show={confirmingUserDeletion} 
                    onClose={closeModal}
                    className="modal-backdrop"
                >
                    <div className="modal-content p-8 m-4 max-w-md mx-auto">
                        <form onSubmit={deleteUser}>
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                                    <i className="fas fa-exclamation-triangle text-white text-3xl warning-icon"></i>
                                </div>
                                
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    Tem certeza que deseja excluir sua conta?
                                </h2>

                                <p className="text-gray-600 leading-relaxed">
                                    Uma vez que sua conta for excluída, todos os seus recursos e dados 
                                    serão permanentemente deletados. Digite sua senha para confirmar 
                                    que você gostaria de excluir permanentemente sua conta.
                                </p>
                            </div>

                            <div className="mb-6">
                                <InputLabel
                                    htmlFor="password"
                                    value="Senha"
                                    className="sr-only"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    className="input-gradient w-full px-4 py-3 text-lg"
                                    isFocused
                                    placeholder="Digite sua senha"
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2 text-red-500 font-medium"
                                />
                            </div>

                            <div className="flex gap-4 justify-center">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="btn-secondary-gradient text-gray-700 px-6 py-3 rounded-2xl font-semibold transition duration-300 hover:scale-105"
                                >
                                    <i className="fas fa-times mr-2"></i>
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-danger-gradient text-white px-6 py-3 rounded-2xl font-semibold transition duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin mr-2"></i>
                                            Excluindo...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-trash mr-2"></i>
                                            Excluir Conta
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>

                {/* Font Awesome Icons */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
            </section>
        </>
    );
}