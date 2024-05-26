import {useContext, useEffect, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import UserInfoContext from '../../contexts/UserInfoContext.tsx';
import logout from "../../api/account/logout.ts";
import {useNavigate} from "react-router-dom";
import UserPreferences, {Preferences} from "../preferences/UserPrefrences.tsx";
import {useTheme} from '../../contexts/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {userInfo, setUserInfo} = useContext(UserInfoContext);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const {theme, toggleTheme, onThemeChange} = useTheme();

  useEffect(() => {
  }, [userInfo]);

  const switchMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const switchMenuClose = () => setAnchorEl(null);

  const navigate = useNavigate();

  // todo: don't need to be here?
  const preferences: Preferences[] = [
    {
      label: "the best input in the whole world",
      type: 'text',
      onChange: (value: React.ChangeEvent<HTMLInputElement>) => console.log(value.target.value),
      defaultValue: ''
    },
    {
      label: "theme",
      type: 'boolean',
      onChange: toggleTheme,
      value: theme !== 'light'
    },
    {
      label: "theme",
      type: 'buttonGroup',
      onChange: onThemeChange,
      value: theme,
      options: [{text: "light", icon: <LightModeIcon/>}, {text: "dark", icon: <DarkModeIcon/>}],
    },
    {
      label: "number",
      type: 'number',
      onChange: (value: React.ChangeEvent<HTMLInputElement>) => console.log(value.target.value),
    },
    {
      label: "family members",
      type: 'select',
      onChange: (value: string) => console.log(value),
      options: [{text: "Shirley", value: 1}, {text: "Dana", value: 2}, {text: "Robin", value: 3}]
    },
  ];

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
          setPreferencesOpen(true);
        }}>
          Preferences
        </MenuItem>
      </Menu>

      <UserPreferences preferences={preferences} isOpen={preferencesOpen} setIsOpen={setPreferencesOpen}/>
    </>
  );
};

export default ProfileMenu;
