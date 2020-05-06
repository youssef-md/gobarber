import React from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styles';
import Toast from './Toast';
import { ToastState } from '../../hooks/toast';

interface ToastContainerProps {
  toasts: ToastState[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const toastsWithTransitions = useTransition(toasts, (toast) => toast.id, {
    from: { right: '-120%' },
    enter: { right: '0%' },
    leave: { right: '-120%' },
  });

  return (
    <Container>
      {toastsWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} toast={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
