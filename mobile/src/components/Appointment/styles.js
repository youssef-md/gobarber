import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
  opacity: ${({past}) => (past ? 0.6 : 1)};
`;

export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Info = styled.View`
  margin-left: 15px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const Time = styled.Text`
  color: #999;
  font-size: 13px;
  margin-top: 3px;
`;
