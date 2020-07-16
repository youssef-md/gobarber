import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  avatar_url: string;
  name: string;
}

interface AuthContextShape {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  user: User;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextShape>({} as AuthContextShape);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(
    function retrieveDataFromStorageIfExists() {
      const user = localStorage.getItem('@gobarber:user');
      const token = localStorage.getItem('@gobarber:token');

      if (user && token) return { user: JSON.parse(user), token };

      return {} as AuthState;
    }
  );

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { user, token } = response.data;
    localStorage.setItem('@gobarber:user', JSON.stringify(user));
    localStorage.setItem('@gobarber:token', token);

    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@gobarber:user');
    localStorage.removeItem('@gobarber:token');

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
