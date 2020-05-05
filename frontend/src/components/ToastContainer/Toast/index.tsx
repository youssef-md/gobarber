import React, { useEffect } from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
  toast: ToastMessage;
}

const Toast: React.FC<ToastProps> = ({ toast }) => {
  const { id, type, title, description } = toast;
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => {
      clearTimeout(timer); // if the user closed the timer before 3s
    };
  }, [removeToast, id]);

  return (
    <Container hasDescription={!!description} type={type}>
      <FiAlertCircle size={20} />

      <div>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
