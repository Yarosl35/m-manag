import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ReplayIcon from '@material-ui/icons/Replay';
import { FC } from 'react';
import { Link } from 'react-router-dom';

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
export const LoginFailed: FC = () => {
  const style = styles();
  return (
    <div className={style.loginPage}>
      <p className={style.textFailed}>
        You`re not authorized to view
        the content of this site, for any questions,
        please contact tech support team
      </p>
      <Link
        className={style.linkFailed}
        to="/login"
      >
        <Button variant="contained">
          <p> try again </p>
          {' '}
          <ReplayIcon />
        </Button>

      </Link>

    </div>
  );
};
