import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LoadingProps {
    isLoading: boolean;
    children: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ isLoading, children }) => {
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 h-screen w-screen">
            {isLoading && (
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-[#ffffff7a] flex items-center justify-center z-30">
                    <FontAwesomeIcon
                        className="animate-spin text-primary text-xl"
                        icon={faSpinner}
                    />
                </div>
            )}
            {children}
        </div>
    );
};

export default React.memo(Loading);
