import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { Container } from './styles';

interface TooltipProps {
  type?: 'error' | 'default';
  message: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  type = 'default',
  message,
  className,
}) => (
  <Container className={className} type={type}>
    <FiAlertCircle size={22} />
    <span>{message}</span>
  </Container>
);

export default Tooltip;
