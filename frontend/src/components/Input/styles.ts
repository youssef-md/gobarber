import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  border-radius: 10px;
  border: 2px solid #232119;
  background: #232129;
  color: #666;

  & + div {
    margin-top: 10px;
  }

  input {
    flex: 1;
    padding: 16px 0;
    background: transparent;
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
