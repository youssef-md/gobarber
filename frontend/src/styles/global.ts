import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #312E38;
    color: #fff;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, strong {
    font-weight: bold
  }

  button {
    cursor: pointer
  }

  a {
    color: #f4ede8;
    text-decoration: none;
    transition: color 0.2s;
  }
`;
