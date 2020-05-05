import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signUpBackground from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translatex(100px)
  }

  to {
    opacity: 1;
    transform: translatex(0px)
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  animation: ${appearFromRight} 0.7s;

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
    color: #f2f2f2;
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
      color: ${shade(0.2, '#f2f2f2')};
    }

    &:hover svg {
      transform: translateX(8px);
    }
  }
`;

const appear = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;

  animation: ${appear} 1s;
`;
