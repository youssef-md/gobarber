import React from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Calendar,
  Section,
  Appointment,
} from './styles';

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

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars1.githubusercontent.com/u/29265857?s=460&u=439da134e6b1a4766dbba464f048a21cf2036f3e&v=4"
                alt="youssef"
              />
              <strong>Youssef Muhamad</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/29265857?s=460&u=439da134e6b1a4766dbba464f048a21cf2036f3e&v=4"
                  alt="youssef"
                />
                <strong>Youssef Muhamad</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/29265857?s=460&u=439da134e6b1a4766dbba464f048a21cf2036f3e&v=4"
                  alt="youssef"
                />
                <strong>Youssef Muhamad</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/29265857?s=460&u=439da134e6b1a4766dbba464f048a21cf2036f3e&v=4"
                  alt="youssef"
                />
                <strong>Youssef Muhamad</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
