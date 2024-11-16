import React, { createContext, useContext, useState } from 'react';
import { ToastifySuccess, ToastifyError, ToastifyInfo } from '../components/Toastify'; // Import your components

const ToastContext = createContext();

export const useToast = () => {
    return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (Component, message, duration = 3000) => {
        const id = Date.now();
        setToasts([...toasts, { id, Component, message, duration }]);
        
        // Automatically remove toast after the duration
        setTimeout(() => {
            setToasts((currentToasts) => currentToasts.filter(toast => toast.id !== id));
        }, duration);
    };

    const toastSuccess = (message, duration) => {
        addToast(ToastifySuccess, message, duration);
    };

    const toastError = (message, duration) => {
        addToast(ToastifyError, message, duration);
    };

    const toastInfo = (message, duration) => {
        addToast(ToastifyInfo, message, duration);
    };

    return (
        <ToastContext.Provider value={{ toastSuccess, toastError, toastInfo }}>
            {children}
            <div className="toast toast-top toast-end">
                {toasts.map(({ id, Component, message, duration }) => (
                    <Component key={id} message={message} duration={duration} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};
