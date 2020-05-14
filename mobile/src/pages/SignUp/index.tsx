import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import api from '../../services/api';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, GoBack, GoBackText } from './styles';
import logoImg from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const navigateBackToSignIn = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSignUpSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          name: yup.string().required('Nome obrigatório'),
          email: yup
            .string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: yup.string().min(6, 'Senha de no mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('users', data);

        Alert.alert(
          'Cadastro efetuado com sucesso',
          'Agora você pode se logar na aplicação'
        );

        navigation.goBack();
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          const errorMessages = Object.values(errors).join('\n');
          Alert.alert('Falha na validação', String(errorMessages));
          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Não foi possível efetuar o cadastro, tente novamente'
        );
      }
    },
    [navigation]
  );

  const handleFormSubmitViaRef = useCallback(() => {
    formRef.current?.submitForm();
  }, [formRef]);

  const handleEmailInputFocusViaRef = useCallback(() => {
    emailRef.current?.focus();
  }, []);

  const handlePasswordInputFocusViaRef = useCallback(() => {
    passwordRef.current?.focus();
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
            <Input
              name="name"
              icon="user"
              placeholder="Digite seu nome..."
              autoCorrect
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={handleEmailInputFocusViaRef}
            />

            <Input
              ref={emailRef}
              name="email"
              icon="mail"
              placeholder="Digite seu email..."
              autoCompleteType="off"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={handlePasswordInputFocusViaRef}
            />

            <Input
              ref={passwordRef}
              name="password"
              icon="lock"
              placeholder="Digite sua senha..."
              secureTextEntry
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={handleFormSubmitViaRef}
              // textContentType="oneTimeCode" -> vai pegar a SMS que chegou e preencher o input automatico
            />
            <Button onPress={handleFormSubmitViaRef}>CADASTRAR</Button>
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
