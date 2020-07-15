import styled from 'styled-components';
import { shade } from 'polished';

import signInBackground from '../../assets/sign-in-background.png';
import { appearFromLeft, fadeIn } from '../../styles/keyframes';

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

  /* Use 100% of the space for the content until exceeds 700px, then let the image grow based on the flex: 1 */
  width: 100%;
  max-width: 800px;

  animation: ${appearFromLeft} 0.6s;

  form {
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;

    h2 {
      font-size: 26px;
      margin-bottom: 30px;
    }

    a {
      display: block;
      margin: 25px 0 35px 0;
      color: #f4ede8;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    display: flex;
    align-items: center;
    margin-top: 34px;
    color: #ff9000;

    > svg {
      margin-right: 10px;
      transition: transform 0.2s;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    &:hover svg {
      transform: translateX(5px);
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;

  animation: ${fadeIn} 0.5s;
`;
