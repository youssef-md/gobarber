import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';
import Background from '../../../components/Background';
import {
  Container,
  ProviderList,
  Provider,
  Avatar,
  Name,
  Hairline,
} from './styles';

export default function SelectProvider({navigation}) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');
      setProviders(response.data);
    }

    loadProviders();
  });

  return (
    <Background>
      <Container>
        <ProviderList
          data={providers}
          keyExtractor={({id}) => String(id)}
          renderItem={({item: provider}) => (
            <Provider
              onPress={() => navigation.navigate('SelectDateTime', {provider})}>
              <Avatar
                source={{
                  uri: provider.avatar
                    ? provider.avatar.url.replace('localhost', '192.168.1.12')
                    : `https://api.adorable.io/avatars/100/${provider.name}`,
                }}
              />
              <Hairline />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectProvider.navigationOptions = ({navigation}) => ({
  title: 'Selecione um Prestador',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
      <Icon name="chevron-left" size={30} color="#fff" />
    </TouchableOpacity>
  ),
});
