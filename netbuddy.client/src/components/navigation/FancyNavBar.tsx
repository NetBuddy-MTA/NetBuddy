import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';

export interface PageAndLink {
  page: string
  link: string
}

interface FancyNavBarProps {
  logo?: string
  pageAndLinks?: Array<PageAndLink> 
}

const FancyNavBar = ({logo, pageAndLinks} : FancyNavBarProps) => {
  return (
    <AppBar position="static" sx={{px: 0, mx:0}}>
      <Toolbar sx={{px: 0, mx: 0}}>
        <Button sx={{paddingLeft: 0}}>
          <MenuIcon/>
        </Button>
        <img src={logo} alt="NetBuddyLogo" width={48} height={48} />
        {pageAndLinks?.map(pageAndLink => {
          return (
            <Button key={pageAndLink.link} component={Link} to={pageAndLink.link} variant="text">
              {pageAndLink.page}
            </Button>
          );
        })}
      </Toolbar>
    </AppBar>
  );
}

export default FancyNavBar;