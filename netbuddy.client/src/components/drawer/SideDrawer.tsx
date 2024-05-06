import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useContext} from 'react';
import DrawerControlsContext from "../../contexts/DrawerControlsContext.tsx";
import Button from '@mui/material/Button';

const SideDrawer = () => {
  const {sideDrawerControls, setSideDrawerControls} = useContext(DrawerControlsContext);
  return (

    <SwipeableDrawer
      anchor="left"
      open={sideDrawerControls!.isOpen}
      onClose={() => {
      }}
      onOpen={() => {
      }}
    >
      <Box sx={{width: 250}} role="presentation">
        <Button onClick={e => {
          e.preventDefault();
          setSideDrawerControls && setSideDrawerControls({...sideDrawerControls, isOpen: false});
        }}>
          close
        </Button>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider/>
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default SideDrawer;
