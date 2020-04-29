import styled from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 70px 0;
    width: 340px;
    text-align: center;
    h2 {
      margin-bottom: 24px;
    }

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232119;
      padding: 16px;
      width: 100%;
      color: #f2f2f2;

      &::placeholder {
        color: #666;
      }

      & + input {
        margin-top: 8px;
      }
    }

    button {
      background: #ff9000;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      height: 56px;
      width: 100%;
      color: #312e38;
      font-weight: bold;
      text-transform: uppercase;
      margin-top: 20px;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#ff9000')};
      }
    }

    a {
      color: #f2f2f2;
      text-decoration: none;
      display: block;
      margin-top: 14px;
      transition: color 0.2s;
      padding: 10px 0;

      &:hover {
        color: ${shade(0.2, '#f2f2f2')};
      }
    }
  }

  > a {
    color: #ff9000;
    text-decoration: none;
    display: block;
    margin-top: 14px;
    transition: color 0.2s;
    padding: 10px 0;

    display: flex;
    align-items: center;

    svg {
      margin-right: 15px;
      transition: transform 0.2s;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    &:hover svg {
      transform: translateX(8px);
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
