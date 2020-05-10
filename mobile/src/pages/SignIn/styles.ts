import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px 40px;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: #f4ede8;
  font-family: 'RobotoSlab-SemiBold';
  margin: 40px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
  color: #f4ede8;
`;

export const CreateAccount = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-width: 1px;
  border-color: rgba(0, 0, 0, 0.25);
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
`;

export const CreateAccountText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
  color: #ff9000;
  margin-left: 8px;
`;
