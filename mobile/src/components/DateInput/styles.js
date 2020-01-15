import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 60px 0 30px;
  padding: 20px 30px 10px 30px;
`;

export const DateButton = styled.TouchableOpacity`
  padding: 0 15px;
  height: 48px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
`;

export const DateEvent = styled.Text`
  font-size: 14px;
  color: #fff;
  margin-left: 15px;
`;

export const Picker = styled.View`
  background: #fff;
  padding: 15px 30px;
  margin-top: 30px;
`;
