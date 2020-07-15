import React, { useEffect } from 'react';
import { FiAlertCircle, FiInfo, FiCheckCircle, FiX } from 'react-icons/fi';

import { Container } from './styles';
import { ToastState, useToast } from '../../../hooks/toast';

interface ToastProps {
  style: object;
  toast: ToastState;
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({
  style,
  toast: { id, type, description, title },
}) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), 3000);

    return function cleanTimerIfUserClosesToastBefore() {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  return (
    <Container type={type} hasDescription={Number(!!description)} style={style}>
      {icons[type]}
      <div>
        <strong>{title}</strong>
        {!!description && <p>{description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(id)}>
        <FiX size={20} />
      </button>
    </Container>
  );
};

export default Toast;
