import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const appearFromLeft = keyframes`
  from {
    transform: translateX(-100px);
    opacity: 0;
  }

  to {
    transform: translateX(0px);
    opacity: 1;
  }
`;

export const appearFromRight = keyframes`
  from {
    transform: translateX(100px);
    opacity: 0;
  }

  to {
    transform: translateX(0px);
    opacity: 1;
  }
`;
