import {useContext, useEffect, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import UserInfoContext from '../../contexts/UserInfoContext.tsx';
import logout from "../../api/account/logout.ts";
import {useNavigate} from "react-router-dom";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {userInfo, setUserInfo} = useContext(UserInfoContext);

  useEffect(() => {
  }, [userInfo]);
  
  const switchMenuOpen = (e: React.MouseEvent<HTMLElement>) => 
    setAnchorEl(e.currentTarget);
  const switchMenuClose = () => 
    setAnchorEl(null);

  const navigate = useNavigate();

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
        <MenuItem onClick={async e => {
          e.preventDefault();
          switchMenuClose();

          let response = await logout();
          if (response) {
            if (setUserInfo) {
              setUserInfo({});
            }
            navigate('/login');
          } else {
            alert("Logout failed. Please try again later.");
          }
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
