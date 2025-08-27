import { Link } from '@inertiajs/react';

export default function ApplicationLogo(props) {
    return (
        <div className="flex items-center space-x-2">
            <Link href="/">
                <img
                    src="/images/logo.webp"
                    alt="BBKits Logo"
                    className="object-contain drop-shadow-xl hover:drop-shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-3 filter hover:brightness-110 hover:saturate-125 cursor-pointer animate-pulse hover:animate-none rounded-xl bg-white from-white/20 to-transparent backdrop-blur-sm border border-white/30 p-1 shadow-xl hover:shadow-yellow-400/50"
                />
            </Link>
        </div>
    );
}
