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
