import styled from 'styled-components';
import { shade } from 'polished';

import signUpBackground from '../../assets/sign-up-background.png';
import { fadeIn, appearFromRight } from '../../styles/keyframes';

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
  animation: ${appearFromRight} 0.5s;

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
  }

  > a {
    display: flex;
    align-items: center;
    margin-top: 34px;
    color: #f4ede8;

    > svg {
      margin-right: 10px;
      transition: transform 0.2s;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }

    &:hover svg {
      transform: translateX(5px);
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
  animation: ${fadeIn} 0.5s;
`;
