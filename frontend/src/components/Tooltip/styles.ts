import styled, { css } from 'styled-components';

interface ContainerProps {
  type: 'default' | 'error';
}

const variations = {
  default: css`
    background: #ff9000;
    color: #000;
  `,
  error: css`
    background: #c53030;
    color: #fff;
  `,
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  position: relative;

  span {
    width: 160px;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    text-align: center;

    padding: 8px;
    border-radius: 4px;
    font-weight: bold;
    ${({ type }) => variations[type]}

    transition: all .4s;
    opacity: 0;
    visibility: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 100%;

      border-style: solid;
      border-color: ${({ type }) => (type === 'error' ? '#c53030' : '#ff9000')}
        transparent;
      border-width: 6px 6px 0 6px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
