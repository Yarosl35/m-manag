import { makeStyles } from '@material-ui/core/styles';
import { FC, useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { signIn, signInType } from '../../services/authService';
import { BtnGoogle } from '../button-google';
import { AuthContext } from '../../context/AuthContext';

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
  const auth = useContext(AuthContext);
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
  if (auth !== null) return <Redirect to="/" />;
  return (
    <div className={style.loginPage}>
      <BtnGoogle onSubmit={onSubmit} />
    </div>
  );
};
