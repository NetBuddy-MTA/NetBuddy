import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

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
    <AppBar position="static" sx={{top: 0, left: 0}}>
      <Container maxWidth="sm" key="logoContainer" className="flex ">
        <img src={logo} alt="NetBuddy Logo" width={64} height={64} />
      </Container>
      <Container maxWidth="xl" key="linkContainer">
        {pageAndLinks?.map(pageAndLink => {
          return (
            <Link to={pageAndLink.link} key={pageAndLink.page}>
              <button type="button">
                {pageAndLink.page}
              </button>
            </Link>
          );
        })}
      </Container>
    </AppBar>
  );
}

export default FancyNavBar;