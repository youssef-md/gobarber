import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@rocketseat/unform';

import { Container } from './styles';
import { DefaultForm } from '../../styles/form';

import { updateProfileRequest } from '../../store/modules/user/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <DefaultForm initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu email" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua nova senha"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Atualizar perfil'}
        </button>
      </DefaultForm>

      <button type="button">Sair do GoBarber</button>
    </Container>
  );
}
