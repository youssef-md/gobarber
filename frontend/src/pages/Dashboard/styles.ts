import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1120px;
  padding: 0 5px;
  margin: 0 auto;

  > img {
    width: 140px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    span {
      color: #f4ede8;
    }

    strong {
      color: #ff9000;
      line-height: 1.5;
    }
  }

  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin: 0 15px;
  }

  button {
    background: none;
    border: 0;
    color: #999591;
    width: 22px;
    height: 22px;
    transition: color 0.2s;

    &:hover {
      color: #fff;
    }
  }
`;
