import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {darken} from 'polished';

export const StyledContainer = styled.View`
  /* padding: 0 15px; */
  height: 48px;
  background: rgba(0, 0, 0, 0.2);
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
`;

export const IconBackground = styled.View`
  justify-content: center;
  align-items: center;
  background: #fff;
  height: 100%;
  width: 45px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const StyledIcon = styled(Icon).attrs(({name}) => ({
  name,
  size: 20,
  color: darken(0.05, '#7159c1'),
}))``;

export const StyledTextInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.8)',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
`;
