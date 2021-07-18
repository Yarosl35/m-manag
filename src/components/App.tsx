import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../App.css';
import authContext from '../context/authContext';
import { signInType } from '../services/authService';
import CookBook from './pages/CookBook';
import Home from './pages/Home';
import Login from './pages/Login';
import LoginFailed from './pages/LoginFailed';
// import Test from './pages/Test';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const [auth, setAuth] = useState<signInType | null>(null);
  return (
    <Router>
      <authContext.Provider value={auth}>
        <Switch>
          <Route path="/login-failed">
            <LoginFailed />
          </Route>
          <Route path="/login">
            <Login setAuth={setAuth} />
          </Route>
          <PrivateRoute auth={auth} path="/cookbook">
            <CookBook />
          </PrivateRoute>
          <PrivateRoute auth={auth} path="/">
            <Home />
          </PrivateRoute>
          <Route path="*" component={() => (<p>404 not found</p>)} />
        </Switch>
      </authContext.Provider>
    </Router>
  );
};
export default App;
