import { createContext } from 'react';
import { signInType } from '../services/authService';

const authContext = createContext<null | signInType>(null);
export default authContext;
