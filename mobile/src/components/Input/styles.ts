import styled, { css } from 'styled-components/native';
import FeatherIcons from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  background: #232129;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 3px 16px;
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-color: #232129;

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'RobotoSlab-Regular';
  color: #fff;
`;

export const Icon = styled(FeatherIcons)`
  margin-right: 8px;
`;
