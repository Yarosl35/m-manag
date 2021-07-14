import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
import LoginFailed from './pages/LoginFailed';
import { signInType } from '../services/authService';
import Home from './pages/Home';

const App = () => {
  const [auth, setAuth] = useState<signInType | null>(null);
  const style = {
    marginLeft: '20px',
  };
  return (
    <Router>
      <div style={style}>
        <Switch>
          <Route path="/login-failed">
            <LoginFailed />
          </Route>
          <Route path="/login">
            <Login setAuth={setAuth} />
          </Route>

          <PrivateRoute auth={auth}>
            <Home auth={auth} />
          </PrivateRoute>
          <Route path="*" component={() => (<p>404 not found</p>)} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
