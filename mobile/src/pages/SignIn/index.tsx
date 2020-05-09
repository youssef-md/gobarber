import React from 'react';
import { Image, Alert } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title } from './styles';
import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu login</Title>
      <Input name="email" icon="mail" placeholder="Digite seu email..." />
      <Input name="password" icon="lock" placeholder="Digite sua senha..." />
      <Button onPress={() => Alert.alert('oi')}>ENTRAR</Button>
    </Container>
  );
};

export default SignIn;
