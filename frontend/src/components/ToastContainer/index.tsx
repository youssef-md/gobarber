import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container, Toast } from './styles';
import { ToastMessage, useToast } from '../../hooks/toast';

interface ToastContainerProps {
  toasts: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const { removeToast } = useToast();

  return (
    <Container>
      {toasts.map(({ id, title, description, type }) => (
        <Toast key={id} hasDescription={!!description} type={type}>
          <FiAlertCircle size={20} />

          <div>
            <strong>{title}</strong>
            {description && <p>{description}</p>}
          </div>

          <button type="button" onClick={() => removeToast(id)}>
            <FiXCircle size={18} />
          </button>
        </Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
