import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type: 'info' | 'success' | 'error';
  hasDescription: number;
}

const variations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  position: relative;
  width: 360px;
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  ${({ type }) => variations[type]} & +
    div {
    margin-top: 8px;
  }

  div {
    flex: 1;
    margin: 0 10px;

    p {
      margin-top: 7px;
    }
  }

  button {
    background: none;
    border: 0;
    color: inherit;
    position: absolute;
    right: 14px;
  }
`;
