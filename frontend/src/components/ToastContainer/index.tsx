import React from 'react';

import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';
import Toast from './Toast';

interface ToastContainerProps {
  toasts: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <Container>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </Container>
  );
};

export default ToastContainer;
