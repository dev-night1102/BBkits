import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function GuestLayout({ children }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative flex min-h-screen flex-col items-center bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-6 sm:justify-center sm:pt-0 overflow-hidden">
            {/* Floating background particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float opacity-10"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 20}s`,
                            animationDuration: `${15 + Math.random() * 10}s`
                        }}
                    >
                        <div 
                            className="bg-gradient-to-r from-pink-300 via-purple-300 to-pink-400 rounded-full"
                            style={{
                                width: `${3 + Math.random() * 8}px`,
                                height: `${3 + Math.random() * 8}px`
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Decorative gradient orbs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-15 blur-3xl animate-pulse-slow animation-delay-1000"></div>

            {/* Logo Section */}
            <div className={`transform transition-all duration-1000 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <Link href="/" className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300 ease-in-out">
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-pink-300/50 transition-all duration-500 group-hover:rotate-12 animate-gradient-x">
                            <span className="text-white font-bold text-2xl drop-shadow-lg">BB</span>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 -z-10"></div>
                        {/* Floating ring */}
                        <div className="absolute inset-0 border-2 border-pink-300 rounded-2xl opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-500"></div>
                    </div>
                    <div className="relative">
                        <span className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 bg-clip-text text-transparent animate-gradient-x">
                            BBKits
                        </span>
                        <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                    </div>
                </Link>
            </div>

            {/* Main Content Card */}
            <div className={`mt-8 w-full transform transition-all duration-1000 ease-out animation-delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="relative max-w-md mx-auto">
                    {/* Card background with glassmorphism */}
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50"></div>
                    
                    {/* Gradient border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 rounded-3xl opacity-20 blur-sm"></div>
                    
                    {/* Main card content */}
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-100/50 overflow-hidden">
                        {/* Top gradient accent */}
                        <div className="h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 animate-gradient-x"></div>
                        
                        {/* Content area */}
                        <div className="px-8 py-8">
                            <div className="animate-fade-in-up animation-delay-500">
                                {children}
                            </div>
                        </div>
                        
                        {/* Bottom decorative pattern */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-pink-50/50 to-transparent pointer-events-none"></div>
                    </div>
                    
                    {/* Floating elements around the card */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce opacity-60"></div>
                    <div className="absolute -top-3 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce animation-delay-500 opacity-60"></div>
                    <div className="absolute -bottom-1 -left-3 w-5 h-5 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full animate-bounce animation-delay-1000 opacity-40"></div>
                    <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full animate-bounce animation-delay-1500 opacity-50"></div>
                </div>
            </div>

            {/* Footer decorative text */}
            <div className={`mt-8 text-center transform transition-all duration-1000 ease-out animation-delay-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <p className="text-sm text-gray-500/80 font-medium">
                    Transformando vidas através do 
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-semibold"> empreendedorismo feminino</span>
                </p>
                <div className="flex items-center justify-center mt-2 space-x-1">
                    <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-purple-300 rounded-full animate-pulse animation-delay-300"></div>
                    <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse animation-delay-600"></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.1;
                    }
                    90% {
                        opacity: 0.1;
                    }
                    50% {
                        transform: translateY(-30px) rotate(180deg);
                        opacity: 0.3;
                    }
                }

                @keyframes gradient-x {
                    0%, 100% {
                        background-size: 200% 200%;
                        background-position: left center;
                    }
                    50% {
                        background-size: 200% 200%;
                        background-position: right center;
                    }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0.1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.3;
                        transform: scale(1.05);
                    }
                }

                .animate-float {
                    animation: float 20s infinite linear;
                }

                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 4s ease infinite;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }

                .animation-delay-300 {
                    animation-delay: 0.3s;
                }

                .animation-delay-500 {
                    animation-delay: 0.5s;
                }

                .animation-delay-700 {
                    animation-delay: 0.7s;
                }

                .animation-delay-1000 {
                    animation-delay: 1s;
                }

                .animation-delay-1500 {
                    animation-delay: 1.5s;
                }
            `}</style>
        </div>
    );
}