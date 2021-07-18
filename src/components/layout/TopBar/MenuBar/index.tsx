import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { MouseEvent, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

const MenuTopBar = () => {
  const menuArr: Array<{id: string, name: string, url: string}> = [{ id: '1', name: 'CookBook', url: 'cookbook' }];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ marginTop: '40px', padding: '0' }}
      >
        {menuArr.map(({ id, name, url }) => (
          <Fragment key={id}>
            <MenuItem style={{ width: '100vw' }} onClick={handleClose}>
              <Link
                style={{
                  color: '#000', textDecoration: 'none',
                }}
                to={url}
              >
                {name}
              </Link>
            </MenuItem>
          </Fragment>
        ))}
      </Menu>
    </div>
  );
};
export default MenuTopBar;
