import React, {useRef} from 'react';
import {Text} from 'react-native';

import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';

// import { Container } from './styles';

export default function SignIn() {
  return (
    <Background>
      <Text>Sign In</Text>
      <Input
        style={{marginTop: 30}}
        icon="alarm"
        placeholder="Digite seu email"
      />
      <Input
        style={{marginTop: 30}}
        icon="call"
        placeholder="Digite sua senha"
      />
      <Button>Entrar</Button>
    </Background>
  );
}
