import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SignInCredential {
  email: string;
  password: string;
}

interface AuthContextShape {
  name: string;
  signIn(credentials: SignInCredential): Promise<void>;
}

const AuthContext = createContext<AuthContextShape>({} as AuthContextShape);

const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    console.log(response.data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'youssef', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
