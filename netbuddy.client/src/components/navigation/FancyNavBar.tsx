import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DrawerControlsContext, {SideDrawerControls} from "../../contexts/DrawerControlsContext.tsx";
import {useState} from 'react';
import SideDrawer from "../drawer/SideDrawer.tsx";


export type PageAndLink = {
  page: string;
  link: string;
};

type FancyNavBarProps = {
  logo?: string;
  pageAndLinks?: Array<PageAndLink>;
};

const FancyNavBar = ({logo, pageAndLinks}: FancyNavBarProps) => {
  const [drawerControls, setDrawerControls] = useState<SideDrawerControls>({isOpen: false});

  return (
    <AppBar position="static" sx={{px: 0, mx: 0}}>
      <Toolbar sx={{px: 0, mx: 0}}>
        <Stack direction="row" spacing={3}>
          <Button onClick={e => {
            e.preventDefault();
            setDrawerControls({ ...drawerControls,isOpen:true});
          }}>
            <MenuIcon/>
          </Button>
          <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
            <Stack direction="row" alignItems="center" spacing={1}>
              {logo ? <img src={logo} alt="NetBuddyLogo" width={48} height={48}/> : null}
              <Typography variant="h6" noWrap fontWeight="600">
                NetBuddy
              </Typography>
            </Stack>
          </Link>
          {pageAndLinks?.map((pageAndLink) => (
            <Button key={pageAndLink.link} component={Link} to={pageAndLink.link} variant="text"
                    sx={{fontWeight: '600'}}>
              {pageAndLink.page}
            </Button>
          ))}
        </Stack>
      </Toolbar>
      <DrawerControlsContext.Provider value={{sideDrawerControls: drawerControls, setSideDrawerControls: setDrawerControls}}>
        <SideDrawer/>
      </DrawerControlsContext.Provider>
    </AppBar>
  );
};

export default FancyNavBar;

