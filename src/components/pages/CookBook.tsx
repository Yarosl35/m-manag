import { useQuery } from '@apollo/client';
import List from '@material-ui/core/List';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { GetMenuItemsData, GET_MENU_ITEMS } from '../../queries/menus';
import { Layout } from '../layout';
import { Loader } from '../loader/Loader';

const styles = makeStyles({
  root: {
    background: '#F9F9F9',
    marginTop: '8px',
    borderRadius: '5px',
  },
  titleMenu: {
    marginLeft: '5px',
    fontSize: '2em',
  },
  link: {
    textDecoration: 'none',
  },
  menuList: {
    color: 'black',
    padding: '15px',
    borderRadius: '10px',
    marginBottom: '5px',
    background: '#efefef',
    '&:hover': {
      background: '#f8f8f8',
    },
  },

});
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    marginTop: '10px',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export const CookBook: FC = () => {
  const { data } = useQuery<GetMenuItemsData>(GET_MENU_ITEMS);
  const classes = useStyles();
  const style = styles();

  return (
    <Layout>
      <div className={classes.root}>
        {!data ? (
          <Loader />
        ) : (
          <>
            <Typography variant="h5" className={style.titleMenu}>
              CookBook
            </Typography>
            <List component="nav" aria-label="secondary mailbox folders">
              {data.menu_item.map(({ sku, name, uuid }) => (
                <Fragment key={uuid}>
                  <Link
                    to={`/menu-item/${uuid}`}
                    className={style.link}
                  >
                    <div className={style.menuList}>
                      <p>{`${sku} | ${name}`}</p>
                    </div>
                  </Link>
                </Fragment>
              ))}
            </List>
          </>
        )}

      </div>
    </Layout>
  );
};
