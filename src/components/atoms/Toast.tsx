import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose,  duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgColor = type === 'success' ? 'bg-success' : 'bg-error';
    const Icon = type === 'success' ? CheckCircle : AlertCircle;

    return (
        <div className={`fixed bottom-4 right-4 flex items-center gap-2 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50`}>
            <Icon className="w-5 h-5" />
            <span>{message}</span>
            <button
                onClick={onClose}
                className="ml-2 hover:opacity-80"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Toast;
