import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

interface ToastContextShape {
  addToast(toast: Omit<ToastState, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastState {
  id: string;
  type: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

const ToastContext = createContext({} as ToastContextShape);

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastState, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setToasts([...toasts, toast]);
    },
    [toasts]
  );

  const removeToast = useCallback((id: string) => {
    setToasts(function removeToastWithInformedId(oldState) {
      return oldState.filter((toast) => toast.id !== id);
    });
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextShape {
  const context = useContext(ToastContext);

  if (!context) throw new Error('useToast must be used within <ToastProvider>');

  return context;
}

export { ToastProvider, useToast };
