import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthContextShape {
  user: object;
  signIn(credentials: SignInCredential): Promise<void>;
}

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredential {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextShape>({} as AuthContextShape);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) return { token, user: JSON.parse(user) };
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    setData({ token, user });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextShape {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within as AuthProvider');

  return context;
}

export { AuthProvider, useAuth };
