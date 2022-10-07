import React, { useCallback } from 'react';

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import NavMenu from 'src/layout/Header/NavMenu';
import NavMenuXs from 'src/layout/Header/NavMenuXs';
import routes from 'src/routes';

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            setAnchorElNav(event.currentTarget);
        },
        []
    );

    const handleCloseNavMenu = useCallback(() => {
        setAnchorElNav(null);
    }, []);

    return (
        <AppBar position='sticky' color='primary'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                        }}>
                        FacctView
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}>
                            {Boolean(anchorElNav) && (
                                <NavMenuXs
                                    routes={routes}
                                    handleCloseNavMenu={handleCloseNavMenu}
                                />
                            )}
                        </Menu>
                    </Box>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}>
                        FacctView
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}>
                        <NavMenu routes={routes} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
