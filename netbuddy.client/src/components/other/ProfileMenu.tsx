import {useContext, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import UserInfoContext from '../../contexts/UserInfoContext.tsx';

const ProfileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {userInfo} = useContext(UserInfoContext);
  
  const switchMenuOpen = () => setMenuOpen(!menuOpen);

  return (
    <>
      <Button onClick={e => {
        e.preventDefault();
        switchMenuOpen();
      }}>
        <Avatar sx={{ width: 32, height: 32 }}>
          {userInfo?.username!.charAt(0).toUpperCase()}
        </Avatar>
      </Button>
      
      <Menu
        open={menuOpen}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'right' }}
      >
        <MenuItem onClick={e => {
          e.preventDefault();
          switchMenuOpen();
        }}>
          Sign Out
        </MenuItem>
        
        <MenuItem onClick={e => {
          e.preventDefault();
          switchMenuOpen();
        }}>
          Preferences
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
