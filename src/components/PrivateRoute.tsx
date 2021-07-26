import { FC, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export interface PrivateRouteType {
  path: string
}

export const PrivateRoute: FC<PrivateRouteType > = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  const render = () => (auth === null
    ? <Redirect to="/login" />
    : children);
  return <Route {...rest} render={render} />;
};
