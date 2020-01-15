import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const HourList = styled.FlatList.attrs({
  numColumns: 2,
  showsVerticalScrollIndicator: false,
})`
  padding: 0 20px;
`;

export const Hour = styled(RectButton)`
  background: #ffff;
  border-radius: 5px;
  padding: 20px;
  flex: 1;
  opacity: ${({enabled}) => (enabled ? 1 : 0.6)};
  align-items: center;
  margin: 0px 10px 25px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;
