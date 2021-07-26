import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';

const useStyleMenu = makeStyles({
  linkMenuBar: {
    color: '#000',
    textDecoration: 'none',
  },
  MenuItem: {
    width: '100vw',
  },
  MenuBarTop: {
    marginTop: '40px',
    padding: '0px',
  },
});
export const MenuBar = () => {
  const classes = useStyleMenu();
  const menuArr: Array<{id: string, name: string, url: string}> = [{ id: '1', name: 'CookBook', url: '/cookbook' }];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.MenuBarTop}
      >
        {menuArr.map(({ id, name, url }) => (
          <MenuItem key={id} className={classes.MenuItem} onClick={handleClose}>
            <Link className={classes.linkMenuBar} to={url}>
              {name}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
