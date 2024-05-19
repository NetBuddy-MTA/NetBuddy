import {useContext, useEffect, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import UserInfoContext from '../../contexts/UserInfoContext.tsx';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {userInfo} = useContext(UserInfoContext);

  useEffect(() => {
  }, [userInfo]);
  
  const switchMenuOpen = (e: React.MouseEvent<HTMLElement>) => 
    setAnchorEl(e.currentTarget);
  const switchMenuClose = () => 
    setAnchorEl(null);
  
  return (
    <>
      <Button onClick={e => {
        e.preventDefault();
        switchMenuOpen(e);
      }}>
        <Avatar sx={{width: 32, height: 32}}>
          {userInfo?.username!.charAt(0).toUpperCase()}
        </Avatar>
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={anchorEl !== null}
        onClose={switchMenuClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        <MenuItem onClick={e => {
          e.preventDefault();
          switchMenuClose();
        }}>
          Sign Out
        </MenuItem>

        <MenuItem onClick={e => {
          e.preventDefault();
          switchMenuClose();
        }}>
          Preferences
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
