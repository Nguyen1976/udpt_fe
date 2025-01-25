import React from 'react';

import { useToast } from '~/context/ToastContext';
import ToastItem from './ToastItem';

import { Toast } from '~/context/ToastContext';

//status : { error, success }
function ListToast() {
    const { toasts } = useToast();

    return (
        <div className="z-50 fixed top-10 right-5">
            {toasts.map((toast: Toast) => (
                <ToastItem
                    key={toast.id}
                    id={toast.id}
                    message={toast.message}
                    status={toast.status}
                />
            ))}
        </div>
    );
}

export default ListToast;
