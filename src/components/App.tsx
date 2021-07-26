import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../App.css';
import { AuthContext } from '../context/AuthContext';
import { signInType } from '../services/authService';
import { CookBook } from './pages/CookBook';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { LoginFailed } from './pages/LoginFailed';
import { MenuItem } from './pages/MenuItem';
import { PrivateRoute } from './PrivateRoute';

export const App = () => {
  const [auth, setAuth] = useState<signInType | null>(null);
  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <Switch>
          <Route path="/login-failed">
            <LoginFailed />
          </Route>
          <Route path="/login">
            <Login setAuth={setAuth} />
          </Route>
          <PrivateRoute path="/cookbook">
            <CookBook />
          </PrivateRoute>
          <PrivateRoute path="/menu-item/:uuid">
            <MenuItem />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
          <Route path="*" component={() => (<p>404 not found</p>)} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};
