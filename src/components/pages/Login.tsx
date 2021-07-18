import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { signIn, signInType } from '../../services/authService';
import BtnGoogle from '../button-google';
import './styles/login.css';

interface LoginType {
  setAuth: (obj: signInType) => void
}
const Login: FC<LoginType> = ({ setAuth }) => {
  const history = useHistory();
  const onSubmit = async () => {
    const resultObj: signInType | null = await signIn();
    if (!resultObj) return history.push('/login-failed');

    const {
      displayName, photoURL, token, email,
    } = resultObj;
    setAuth({
      displayName, photoURL, token, email,
    });
    return history.push('/');
  };
  return (
    <div className="loginPage">
      <BtnGoogle onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
