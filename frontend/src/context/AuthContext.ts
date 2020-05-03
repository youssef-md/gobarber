import { createContext } from 'react';

interface AuthContextShape {
  name: string;
}

const AuthContext = createContext<AuthContextShape>({} as AuthContextShape);

export default AuthContext;
