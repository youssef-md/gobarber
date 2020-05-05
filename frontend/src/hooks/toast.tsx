import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

interface ToastContextShape {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextShape>({} as ToastContextShape);

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
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
    setToasts((state) => state.filter((toast) => toast.id !== id));
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

  if (!context) throw new Error('useToast must be used within a ToastProvider');

  return context;
}

export { ToastProvider, useToast };
