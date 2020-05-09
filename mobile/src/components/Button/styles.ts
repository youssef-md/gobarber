import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  padding: 17px 0;
  justify-content: center;
  align-items: center;
  background: #ff9000;
  border-radius: 5px;
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-SemiBold';
  color: #312e38;
  font-size: 16px;
`;
