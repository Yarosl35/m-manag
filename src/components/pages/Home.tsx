import { makeStyles } from '@material-ui/core/styles';
import { FC } from 'react';
import { Layout } from '../layout';

const styleHome = makeStyles({
  root: {
    width: '100%',
    height: '100vh',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
export const Home: FC = () => {
  const style = styleHome();
  return (
    <Layout>
      <div className={style.root}>
        <p>click on the menu</p>
      </div>
    </Layout>
  );
};
