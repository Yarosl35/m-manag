import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import './styles/login.css';

const LoginFailed: FC = () => (
  <div className="loginPage">
    <p className="text-failed">You`re not authorized to view the content of this site, for any questions, please contact tech support team</p>
    <Link
      className="linkFailed"
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

export default LoginFailed;
