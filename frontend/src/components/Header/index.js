import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Notifications from '../Notifications';
import { Container, Content, Profile } from './styles';
import logo from '../../assets/logo-purple.svg';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} al="Go Barber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                profile.avatar.url ||
                'https://api.adorable.io/avatars/126/abott@adorable.png'
              }
              alt="Foto de Youssef Muhamad"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
