import { createContext } from 'react';
import { signInType } from '../services/authService';

export const AuthContext = createContext<null | signInType>(null);
