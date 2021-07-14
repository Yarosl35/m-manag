import { FC, useState, useEffect } from 'react';
import { PrivateRouteType } from '../PrivateRoute';

const Home: FC<PrivateRouteType> = ({ auth }) => {
  const [nameUSer, setUserName] = useState('');

  useEffect(() => {
    if (auth) setUserName(auth.displayName);
  }, [auth]);
  return (
    <div>
      <p style={{ fontSize: '1em' }}>{`Welcome, ${nameUSer}!`}</p>
    </div>
  );
};

export default Home;
