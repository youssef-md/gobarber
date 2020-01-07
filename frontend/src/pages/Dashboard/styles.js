import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  margin: 80px auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    display: flex;

    button {
      border: 0;
      background: none;
    }

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 14px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    margin-top: 30px;
  }
`;

export const Time = styled.li`
  width: 300px;
  padding: 25px;
  background: #fff;
  border-radius: 4px;
  opacity: ${({ past }) => (past ? 0.7 : 1)};

  strong {
    display: block;
    color: ${({ available }) => (available ? '#999' : '#7159c1')};
    font-size: 20px;
  }

  span {
    display: block;
    margin-top: 5px;
    color: ${({ available }) => (available ? '#999' : '#666')};
  }
`;
