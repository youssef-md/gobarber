import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';

import {Container, Left, Avatar, Info, Name, Time} from './styles';

export default function Appointment({appointment, onCancel}) {
  const parsedDate = useMemo(
    () =>
      formatRelative(parseISO(appointment.date), new Date(), {
        locale: pt,
      }),

    [appointment.date],
  );

  return (
    <Container past={appointment.past}>
      <Left>
        <Avatar
          source={{
            uri: appointment.provider.avatar
              ? appointment.provider.avatar.url.replace(
                  'localhost',
                  '192.168.1.12',
                )
              : `https://api.adorable.io/avatars/50/${appointment.provider.name}`,
          }}
        />
        <Info>
          <Name>{appointment.provider.name}</Name>
          <Time>{parsedDate}</Time>
        </Info>
      </Left>

      {appointment.cancelable && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={22} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}
