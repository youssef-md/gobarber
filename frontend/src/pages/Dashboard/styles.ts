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

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.section`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    font-weight: bold;

    span + span {
      margin-left: 8px;
      padding-left: 8px;
      border-left: 1px solid;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      background: #ff9000;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
`;
