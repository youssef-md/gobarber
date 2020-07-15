import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import { useHistory, useLocation } from 'react-router-dom';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { search } = useLocation();
  const { addToast } = useToast();
  const paramsToken = new URLSearchParams(search).get('token');

  const handleResetPasswordSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          password: yup.string().required('Senha obrigatória'),
          password_confirmation: yup
            .string()
            .oneOf([yup.ref('password'), null], 'As senhas não batem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token: paramsToken,
        });

        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso!',
          description: 'Faça o login com sua nova senha',
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
          title: 'Erro ao resetar a senha',
          description: 'Ocorreu um erro ao resetar a senha, tente novamente.',
        });
      }
    },
    [history, addToast, paramsToken]
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="Go Barber Logo" />
        <Form
          onSubmit={handleResetPasswordSubmit}
          ref={formRef}
          autoComplete="off"
        >
          <h2>Crie uma nova senha</h2>
          <Input
            name="password"
            type="password"
            placeholder="Sua nova senha..."
            icon={FiLock}
          />
          <Input
            name="password_confirmation"
            type="password"
            placeholder="Confirme sua nova senha..."
            icon={FiLock}
          />
          <Button type="submit">Alterar senha</Button>
        </Form>
      </Content>

      <Background />
    </Container>
  );
};

export default ResetPassword;
