import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  padding: 0 20px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 2px solid #eee;
    }

    a {
      font-weight: bold;
      color: #7159c1;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 2px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong,
    a {
      display: block;
    }

    strong {
      color: #333;
    }

    a {
      color: #7159c1;
    }
  }

  img {
    height: 42px;
    width: 42px;
    border-radius: 50%;
  }
`;
