import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {useDrawerControl,DrawerControlProvider } from "../../contexts/DrawerControlsContext.tsx";

export type PageAndLink = {
    page: string;
    link: string;
};

type FancyNavBarProps = {
    logo?: string;
    pageAndLinks?: Array<PageAndLink>;
    children?: React.ReactNode;
};

const FancyNavBar: React.FC<FancyNavBarProps> = ({ logo, pageAndLinks, children }) => {
    const { openDrawer } = useDrawerControl();

    return (
        <AppBar position="static" sx={{ px: 0, mx: 0 }}>
            <Toolbar sx={{ px: 0, mx: 0 }}>
                <Stack direction="row" spacing={3}>
                    <Button onClick={openDrawer}>
                        <MenuIcon />
                    </Button>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            {logo ? <img src={logo} alt="NetBuddyLogo" width={48} height={48} /> : null}
                            <Typography variant="h6" noWrap fontWeight="600">
                                NetBuddy
                            </Typography>
                        </Stack>
                    </Link>
                    {pageAndLinks?.map((pageAndLink) => (
                        <Button key={pageAndLink.link} component={Link} to={pageAndLink.link} variant="text" sx={{ fontWeight: '600' }}>
                            {pageAndLink.page}
                        </Button>
                    ))}
                </Stack>
            </Toolbar>
            <DrawerControlProvider>
                {children}
            </DrawerControlProvider>
        </AppBar>
    );
};

export default FancyNavBar;

