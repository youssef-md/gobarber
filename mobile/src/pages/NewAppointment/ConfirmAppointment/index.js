import React, {useMemo} from 'react';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '../../../components/Background';
import {Container, Avatar, DateTime, Name, SubmitButton} from './styles';
import api from '../../../services/api';

export default function ConfirmAppointment({navigation}) {
  const provider = navigation.getParam('provider');
  const datetime = navigation.getParam('datetime');

  const formattedDate = useMemo(
    () => formatRelative(parseISO(datetime), new Date(), {locale: pt}),
    [datetime],
  );

  async function handleCreateAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: datetime,
    });

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url.replace('localhost', '192.168.1.12')
              : `https://api.adorable.io/avatars/100/${provider.name}`,
          }}
        />

        <Name>{provider.name}</Name>
        <DateTime>{formattedDate}</DateTime>

        <SubmitButton onPress={handleCreateAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

ConfirmAppointment.navigationOptions = {
  title: 'Confirmar agendamento',
};
