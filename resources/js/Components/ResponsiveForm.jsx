export default function ResponsiveForm({ children, onSubmit, className = '' }) {
    return (
        <form 
            onSubmit={onSubmit} 
            className={`space-y-6 ${className}`}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {children}
            </div>
        </form>
    );
}

export function FormSection({ title, description, children, fullWidth = false }) {
    return (
        <div className={`${fullWidth ? 'md:col-span-2' : ''}`}>
            {(title || description) && (
                <div className="mb-4">
                    {title && (
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {title}
                        </h3>
                    )}
                    {description && (
                        <p className="text-sm text-gray-600">
                            {description}
                        </p>
                    )}
                </div>
            )}
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

export function FormField({ label, error, required = false, children, icon = null }) {
    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                        {icon && <span className="text-pink-500">{icon}</span>}
                        {label}
                        {required && <span className="text-red-500">*</span>}
                    </span>
                </label>
            )}
            {children}
            {error && (
                <p className="mt-2 text-sm text-red-600 animate-fadeIn">
                    {error}
                </p>
            )}
        </div>
    );
}

export function MobileFormActions({ children, sticky = true }) {
    return (
        <div className={`
            ${sticky ? 'md:sticky md:bottom-0' : ''} 
            bg-white border-t border-gray-200 px-4 py-4 md:px-6 md:py-4
            ${sticky ? '-mx-4 md:-mx-6 lg:-mx-8' : ''}
        `}>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    );
}