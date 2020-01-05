import styled from 'styled-components';
import { Form } from '@rocketseat/unform';
import { darken } from 'polished';

export const DefaultForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  input {
    background: rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 4px;
    padding: 16px 20px;
    color: #fff;
    margin-bottom: 10px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  span {
    background-color: #f64c75;
    border-radius: 4px;
    align-self: flex-start;
    padding: 5px 10px;
    margin-bottom: 8px;
    color: #fff;
  }

  button {
    font-weight: bold;
    font-size: 16px;
    margin-top: 5px;
    padding: 16px 0px;
    background: #3b9eff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    color: #fff;
    border: 0;
    border-radius: 4px;
    transition: all 0.2s;

    &:hover {
      background: ${darken(0.03, '#3b9eff')};
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    &:disabled {
      background: ${darken(0.08, '#3b9eff')};
      box-shadow: none;
    }
  }

  a {
    color: #fff;
    margin-top: 15px;
    font-size: 16px;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`;
