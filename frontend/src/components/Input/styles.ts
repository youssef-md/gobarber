import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #232129;
  border-radius: 5px;

  color: #666360;
  border: 2px solid #232129;

  ${({ isErrored }) =>
    isErrored &&
    css`
      color: #c53030;
      border: 2px solid #c53030;
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      color: #ff9000;
      border: 2px solid #ff9000;
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      color: #ff9000;
    `}



  & + div {
    margin-top: 10px;
  }

  svg {
    margin-right: 10px;
  }

  input {
    padding: 16px 0;
    flex: 1;
    color: #f4ede8;
    background: none;
    border: 0;

    &::placeholder {
      color: #666360;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px #232129 inset !important;
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: #f4ede8 !important;
    }
  }
`;

export const ErrorTooltip = styled(Tooltip)`
  margin-left: 10px;

  svg {
    margin-right: 0;
    color: #c53030;
  }
`;
