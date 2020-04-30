import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232119;
  padding: 16px;
  width: 100%;
  color: #666;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 10px;
  }

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #f2f2f2;

    &::placeholder {
      color: #666;
    }

    & + input {
      margin-top: 8px;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
