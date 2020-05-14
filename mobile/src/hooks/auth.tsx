import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthContextShape {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  user: object;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextShape>({} as AuthContextShape);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function retrieveDataFromStorageIfExists(): Promise<void> {
      const [user, token] = await AsyncStorage.multiGet([
        '@gobarber:user',
        '@gobarber:token',
      ]);

      if (token[1] && user[1])
        setData({ token: token[1], user: JSON.parse(user[1]) });
    }
    retrieveDataFromStorageIfExists();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { user, token } = response.data;

    await AsyncStorage.multiSet([
      ['@gobarber:user', JSON.stringify(user)],
      ['@gobarber:token', token],
    ]);

    setData({ user, token });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@gobarber:user', '@gobarber:token']);
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextShape {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuth must be used within an <AuthProvider>');

  return context;
}

export { AuthProvider, useAuth };
