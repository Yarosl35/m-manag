import { useQuery } from '@apollo/client';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FC, Fragment } from 'react';
import GET_MENU_ITEMS from '../../queries/cookBook';
import Layout from '../layout';

const useStyleBtnList = makeStyles({
  root: {
    background: '#F9F9F9',
    marginTop: '8px',
    borderRadius: '5px',
  },
  titleMenu: {
    marginLeft: '5px',
    fontSize: '2em',
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

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}
interface MenuItem {
  uuid: string
  sku: string
  name:string
}
interface MenuItemList {
  /* eslint-disable camelcase */
  menu_item: MenuItem[]
}
const CookBook: FC = () => {
  const { loading, data } = useQuery<MenuItemList>(GET_MENU_ITEMS);
  const classes = useStyles();
  const listStyle = useStyleBtnList();

  if (!data) return null;
  return (
    <Layout>
      <div className={classes.root}>
        {loading ? (
          <p>Loading </p>
        ) : (
          <>
            <Typography variant="h5" className={listStyle.titleMenu}>
              CookBook
            </Typography>
            <List component="nav" aria-label="secondary mailbox folders">
              {data.menu_item.map(({ sku, name, uuid }) => (
                <Fragment key={uuid}>
                  <ListItemLink href="#simple-list" className={listStyle.root}>
                    <ListItemText primary={`${sku} | ${name}`} />
                  </ListItemLink>
                </Fragment>
              ))}
            </List>
          </>
        )}

      </div>
    </Layout>
  );
};

export default CookBook;
