import { createContext, useContext, useState } from 'react';
import Loading from '~/components/Loading';

const LoadingContext = createContext<
    React.Dispatch<React.SetStateAction<boolean>> | undefined //là kiểu dữ liệu context sẽ lưu trữ
>(undefined);

interface LoadingProviderProps {
    children: React.ReactNode;
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <LoadingContext.Provider value={setLoading}>
            <Loading isLoading={loading}>{children}</Loading>
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
