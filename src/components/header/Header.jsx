import React, { useState } from 'react';
import { AppBar, Toolbar, styled, Button, IconButton, Drawer, List} from '@mui/material';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeProvider';  // Import your custom hook
import { toast } from 'react-toastify';

const Component = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.default,
    color: theme.palette.text.primary,

}));

const Container = styled(Toolbar)(({ theme }) => ({
    justifyContent: 'center',
    '& > a': {
        padding: '20px',
        color: 'inherit', // Inherit color from the theme
        textDecoration: 'none',
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none', // Hide toolbar links for mobile
    },
}));

const HamburgerMenu = styled(IconButton)(({ theme }) => ({
    display: 'none', // Default is hidden
    [theme.breakpoints.down('sm')]: {
        display: 'block', // Show for mobile screens
        position: 'absolute',
        right: 20,
    },
}));

const DrawerContent = styled(List)`
    width: 180px;
    margin:10px;
    text-align: center;
    & > a {
        padding: 10px 0;
        color: inherit;
        text-decoration: none;
        display: block;
    }
`;

const Header = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);

    function handleLogout() {
        toast.success('Logout Successful');
    }

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Component>
            <div>

                <Container>
                    <Link to="/">HOME</Link>
                    <Link to="/about">ABOUT</Link>
                    <Link to="/contact">CONTACT</Link>
                    <Link to="/account" onClick={handleLogout}>
                        LOGOUT
                    </Link>
                    <Button
                        onClick={toggleTheme}
                        variant="contained"
                        style={{
                            backgroundColor: isDarkMode ? '#FFF' : '#000',
                            color: isDarkMode ? '#000' : '#FFF',
                        }}
                    >
                        {isDarkMode ? 'Light' : 'Dark'} Mode
                    </Button>
                </Container>
            </div>
            {/* Hamburger menu for mobile screens */}
            <HamburgerMenu onClick={toggleDrawer}>
                <MenuIcon />
            </HamburgerMenu>
            <Drawer anchor="right" open={open} onClose={toggleDrawer}>
                <DrawerContent>
                    <Link to="/" onClick={toggleDrawer}>
                        HOME
                    </Link>
                    <Link to="/about" onClick={toggleDrawer}>
                        ABOUT
                    </Link>
                    <Link to="/contact" onClick={toggleDrawer}>
                        CONTACT
                    </Link>
                    <Link to="/account" onClick={() => { handleLogout(); toggleDrawer(); }}>
                        LOGOUT
                    </Link>
                    <Button
                        onClick={() => {
                            toggleTheme();
                            setTimeout(() => {
                                setOpen(false);
                            }, 500);
                        }}
                        variant="contained"
                        style={{
                            backgroundColor: isDarkMode ? '#FFF' : '#000',
                            color: isDarkMode ? '#000' : '#FFF',
                            margin: '10px 0',
                        }}
                    >
                        {isDarkMode ? 'Light' : 'Dark'} Mode
                    </Button>

                </DrawerContent>
            </Drawer>
        </Component>
    );
};

export default Header;
