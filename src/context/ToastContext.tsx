import { createContext, useContext, useState } from 'react';
import ListToast from '~/components/ToastMessage';

interface ToastContextType {
    toasts: Toast[];
    addToast: (
        message: string,
        status: 'success' | 'error' | 'warning'
    ) => void;
    closeToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
    undefined
);

interface ToastProviderProps {
    children: React.ReactNode;
}

export interface Toast {
    id: number;
    message: string;
    status: 'success' | 'error' | 'warning';
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const addToast = (
        message: string,
        status: 'success' | 'error' | 'warning'
    ) => {
        const id = new Date().getTime();
        setToasts((prevToasts) => [...prevToasts, { id, message, status }]);
        setTimeout(() => {
            setToasts((prevToasts) =>
                prevToasts.filter((toast) => toast.id !== id)
            ); //sau 3s lọc bỏ toast cũ
        }, 5000);
    };

    const closeToast = (id: number) => {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id)
        );
    };
    return (
        <ToastContext.Provider value={{ toasts, addToast, closeToast }}>
            <ListToast />
            {children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
