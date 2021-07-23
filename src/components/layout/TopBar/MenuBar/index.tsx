import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import './menuBar.css';

const MenuTopBar = () => {
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
        className="MenuBarTop"
      >
        {menuArr.map(({ id, name, url }) => (
          <MenuItem key={id} className="MenuItem" onClick={handleClose}>
            <Link
              className="linkMenuBar"
              to={url}
            >
              {name}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default MenuTopBar;
