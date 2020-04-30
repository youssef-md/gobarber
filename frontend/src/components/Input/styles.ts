import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  border-radius: 10px;
  border: 2px solid #232119;
  background: #232129;
  color: #666;

  & + div {
    margin-top: 10px;
  }

  ${({ isFocused }) =>
    isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    flex: 1;
    padding: 16px 0;
    background: transparent;
    border: 0;
    color: #f2f2f2;

    &::placeholder {
      color: #666;
    }

    & + input {
      margin-top: 8px;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
