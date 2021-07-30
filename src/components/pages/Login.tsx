import { makeStyles } from '@material-ui/core/styles';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { signIn, signInType } from '../../services/authService';
import { BtnGoogle } from '../button-google';

const styles = makeStyles({
  loginPage: {
    width: '100%',
    height: '100vh',
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkFailed: {
    color: '#000',
    textDecoration: 'none',
  },
  textFailed: {
    fontSize: '1em',
    textAlign: 'center',
  },

});
interface LoginType {
  setAuth: (obj: signInType) => void
}
export const Login: FC<LoginType> = ({ setAuth }) => {
  const style = styles();
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
    <div className={style.loginPage}>
      <BtnGoogle onSubmit={onSubmit} />
    </div>
  );
};
