import React from 'react';
import LoadingProvider from '~/context/LoadingContext';

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return <LoadingProvider>{children}</LoadingProvider>;
};

export default Providers;
