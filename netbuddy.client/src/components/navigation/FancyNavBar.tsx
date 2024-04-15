import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Link} from 'react-router-dom';

export interface PageAndLink {
  page: any
  link: string
}

interface FancyNavBarProps {
  logo?: string
  pageAndLinks?: Array<PageAndLink> 
}

const FancyNavBar = ({logo, pageAndLinks} : FancyNavBarProps) => {
  return (
    <AppBar position="static" sx={{top: 0, left: 0}}>
      <Toolbar>
        <div className="gap:16px">
          <img src={logo} alt="NetBuddyLogo" width={64} height={64} />
        </div>
        <div>
          {pageAndLinks?.map(pageAndLink => {
            return (
              <Link to={pageAndLink.link} key={pageAndLink.page}>
                <button type="button">
                  {pageAndLink.page}
                </button>
              </Link>
            );
          })}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default FancyNavBar;