import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSignInSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          email: yup
            .string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Verifique seus dados, você pode ter errado algo.',
        });
      }
    },
    [history, signIn, addToast]
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="Go Barber Logo" />
        <Form onSubmit={handleSignInSubmit} ref={formRef} autoComplete="off">
          <h2>Faça seu login</h2>
          <Input name="email" placeholder="Seu email..." icon={FiMail} />
          <Input
            name="password"
            type="password"
            placeholder="Sua senha..."
            icon={FiLock}
          />
          <Button>Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <Link to="signup">
          <FiLogIn size={20} />
          Criar conta
        </Link>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
