import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 80px auto;
  padding: 0 15px;

  hr {
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin: 10px 0 20px;
  }

  > button {
    width: 100%;
    font-weight: bold;
    font-size: 16px;
    margin-top: 15px;
    padding: 16px 0px;
    background: #f64c75;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    color: #fff;
    border: 0;
    border-radius: 4px;
    transition: all 0.2s;

    &:hover {
      background: ${darken(0.08, '#f64c75')};
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
  }
`;
