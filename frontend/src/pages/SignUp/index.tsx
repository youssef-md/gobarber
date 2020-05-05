import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import * as yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Link } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationsErrors';

import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      // clean all the errors before validating, to clean the last field when all the data is valid
      formRef.current?.setErrors({});

      const schema = yup.object().shape({
        name: yup.string().required('Nome obrigatório'),
        email: yup
          .string()
          .email('Digite um email válido')
          .required('Email obrigatório'),
        password: yup.string().min(6, 'A senha deve ter no mínimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      const formattedErrorsObject = getValidationErrors(error);
      formRef.current?.setErrors(formattedErrorsObject);
    }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <img src={logo} alt="Go Barber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h2>Faça seu cadastro</h2>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <Link to="/">
          <FiArrowLeft />
          Voltar para logon
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
