import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ProviderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
})`
  margin-top: 80px;
  padding: 0 16px;
`;

export const Provider = styled(RectButton)`
  flex: 1;
  padding: 20px 15px;
  margin: 0 10px 20px;
  border-radius: 4px;
  background: #fff;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 55px;
  height: 55px;
  border-radius: 30px;
  border: 1px solid #7159c1;
`;

export const Hairline = styled.View`
  height: 1px;
  width: 50%;
  background: rgba(0, 0, 0, 0.1);
  margin: 10px 0;
`;

export const Name = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;
