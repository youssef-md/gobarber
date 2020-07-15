import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { addToast } = useToast();

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
          password: yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('users', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login.',
        });

        history.push('/');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [history, addToast]
  );

  return (
    <Container>
      <Background />

      <Content>
        <img src={logo} alt="Go Barber Logo" />
        <Form onSubmit={handleSignUpSubmit} autoComplete="off" ref={formRef}>
          <h2>Faça seu cadastro</h2>
          <Input name="name" placeholder="Seu nome..." icon={FiUser} />
          <Input name="email" placeholder="Seu email..." icon={FiMail} />
          <Input
            name="password"
            type="password"
            placeholder="Sua senha..."
            icon={FiLock}
          />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft size={20} />
          Voltar para login
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
