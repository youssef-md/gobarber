import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {withNavigationFocus} from 'react-navigation';

import api from '../../services/api';
import Background from '../../components/Background';
import {Container, Title, List} from './styles';
import Appointment from '../../components/Appointment';

function Dashboard({isFocused}) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (isFocused) loadAppointments();
  }, [isFocused]);

  async function loadAppointments() {
    const response = await api.get('appointments');
    setAppointments(response.data);
  }

  function handleCancel(id) {
    const appointment = appointments.find(a => a.id === id);

    Alert.alert(
      `Cancelar agendamento`,
      `Você realmente deseja cancelar seu agendamento com ${appointment.provider.name} ?`,
      [
        {
          text: 'Sim, quero cancelar',
          onPress: async () => {
            await api.delete(`appointments/${id}`);
            setAppointments(appointments.filter(a => a.id !== id));
          },
        },
      ],
      {cancelable: true},
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={({id}) => String(id)}
          renderItem={({item}) => (
            <Appointment
              onCancel={() => handleCancel(item.id)}
              appointment={item}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({tintColor}) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
