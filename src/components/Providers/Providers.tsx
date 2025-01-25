import React from 'react';
import LoadingProvider from '~/context/LoadingContext';
import ToastProvider from '~/context/ToastContext';

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <ToastProvider>
            <LoadingProvider>{children}</LoadingProvider>
        </ToastProvider>
    );
};

export default Providers;
