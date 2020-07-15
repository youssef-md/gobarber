import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { addToast } = useToast();

  const handleSignInSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          email: yup
            .string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: yup.string().required('Senha obrigatória'),
        });
        // rec senha

        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
        });
      }
    },
    [addToast]
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="Go Barber Logo" />
        <Form onSubmit={handleSignInSubmit} ref={formRef} autoComplete="off">
          <h2>Recuperar senha</h2>
          <Input name="email" placeholder="Seu email..." icon={FiMail} />
          <Button type="submit">Recuperar</Button>
        </Form>

        <Link to="/">
          <FiLogIn size={20} />
          Voltar ao login
        </Link>
      </Content>

      <Background />
    </Container>
  );
};

export default ForgotPassword;
