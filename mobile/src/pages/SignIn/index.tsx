import React, { useCallback, useRef } from 'react';
import { Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText,
} from './styles';
import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const navigateToSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const handleSignInSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Image source={logoImg} />
          <Title>Faça seu login</Title>
          <Form ref={formRef} onSubmit={handleSignInSubmit}>
            <Input
              name="email"
              icon="mail"
              placeholder="Digite seu email..."
              autoCompleteType="off"
              autoCapitalize="none"
            />
            <Input
              name="password"
              icon="lock"
              placeholder="Digite sua senha..."
            />
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              ENTRAR
            </Button>
          </Form>

          <ForgotPassword>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>

          <CreateAccount onPress={navigateToSignUp}>
            <Icon name="log-in" size={20} color="#ff9000" />
            <CreateAccountText>Criar uma conta</CreateAccountText>
          </CreateAccount>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
