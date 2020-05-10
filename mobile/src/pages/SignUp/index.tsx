import React, { useCallback, useRef } from 'react';
import { Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, GoBack, GoBackText } from './styles';
import logoImg from '../../assets/logo.png';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const navigateBackToSignIn = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSignUpSubmit = useCallback((data) => {
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
          <Title>Faça seu cadastro</Title>

          <Form ref={formRef} onSubmit={handleSignUpSubmit}>
            <Input name="name" icon="user" placeholder="Digite seu nome..." />
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
            <Button onPress={() => formRef.current?.submitForm()}>
              CADASTRAR
            </Button>
          </Form>

          <GoBack onPress={navigateBackToSignIn}>
            <Icon name="arrow-left" size={20} color="#f4ede8" />
            <GoBackText>Voltar para login</GoBackText>
          </GoBack>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
