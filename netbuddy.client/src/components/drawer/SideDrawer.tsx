import React from 'react';
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

type SideDrawerProps = {
    open: boolean;
    onClose: () => void;
};

const SideDrawer: React.FC<SideDrawerProps> = ({ open, onClose }) => {
    // Drawer content (list of items)
    const list = (
        < Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={onClose}
            onKeyDown={onClose}
        >
            < List >
                {
                    ['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        < ListItem key={text}
                            disablePadding >
                            < ListItemButton >
                                < ListItemIcon >
                                    {index % 2 === 0 ? < InboxIcon /> : < MailIcon />}
                                </ ListItemIcon >
                                < ListItemText primary={text} />
                            </ ListItemButton >
                        </ ListItem >
                    ))}
            </ List >
            < Divider />
            < List >
                {
                    ['All mail', 'Trash', 'Spam'].map((text, index) => (
                        < ListItem key={text}
                            disablePadding >
                            < ListItemButton >
                                < ListItemIcon >
                                    {index % 2 === 0 ? < InboxIcon /> : < MailIcon />}
                                </ ListItemIcon >
                                < ListItemText primary={text} />
                            </ ListItemButton >
                        </ ListItem >
                    ))}
            </ List >
        </ Box >
    );

    // Render the drawer using the open and onClose props
    return (
        < SwipeableDrawer
            anchor="left"
            open={open}
            onClose={onClose}
            onOpen={() => { }}
        >
            {list}
        </ SwipeableDrawer >
    );
};

export default SideDrawer;
