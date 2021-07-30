import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';

const styles = makeStyles({
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
  const style = styles();
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
        className={style.MenuBarTop}
      >
        {menuArr.map(({ id, name, url }) => (
          <MenuItem key={id} className={style.MenuItem} onClick={handleClose}>
            <Link className={style.linkMenuBar} to={url}>
              {name}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
