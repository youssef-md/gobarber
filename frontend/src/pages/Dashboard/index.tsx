import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Container, Header, HeaderContent, Profile } from './styles';

import logo from '../../assets/logo-name-only.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const {
    signOut,
    user: { name, avatar_url },
  } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="Go Barber" />
          <Profile>
            <div>
              <span>Bem vindo</span>
              <strong>{name}</strong>
            </div>
            <img src={avatar_url} alt={name} />
            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </Profile>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Dashboard;
