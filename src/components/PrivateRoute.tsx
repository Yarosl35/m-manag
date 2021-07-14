import { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { signInType } from '../services/authService';

export interface PrivateRouteType {
  auth: signInType | null
}

const PrivateRoute: FC<PrivateRouteType > = ({
  auth, children, ...rest
}) => {
  const render = () => (auth === null
    ? <Redirect to="/login" />
    : children);
  return <Route {...rest} render={render} />;
};

export default PrivateRoute;
