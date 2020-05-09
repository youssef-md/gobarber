import styled from 'styled-components/native';
import FeatherIcons from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  background: #232129;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 4px 16px;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'RobotoSlab-Regular';
  color: #fff;
`;

export const Icon = styled(FeatherIcons)`
  margin-right: 8px;
`;
