import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
// import { Container } from './styles';

export default function LogIn() {
  return (
    <>
      <img src={logo} alt="Go Barber logo" />
      <form>
        <input type="email" placeholder="Seu e-mail" />
        <input type="password" placeholder="Sua senha secreta" />

        <button type="submit">Acessar</button>
        <Link to="/register">Criar sua conta gratuita</Link>
      </form>
    </>
  );
}
