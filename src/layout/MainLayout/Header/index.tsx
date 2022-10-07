import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import {
    AppBar,
    Avatar,
    Box,
    Button,
    Chip,
    IconButton,
    InputBase,
    Paper,
    Toolbar,
    Typography,
} from '@mui/material';

import User1 from 'src/assets/images/users/user-round.svg';
import { useAppDispatch } from 'src/hooks/hooks';
import { logout } from 'src/store/auth/authSlice';

interface HeaderProps {
    user: any;
    handleDrawerToggle: () => void;
}

const Header = ({ user, handleDrawerToggle }: HeaderProps) => {
    const dispatch = useAppDispatch();

    const handleOnLogout = () => {
        dispatch(logout());
    };

    return (
        <AppBar
            enableColorOnDark
            position='fixed'
            elevation={0}
            sx={{ backgroundColor: 'background.paper' }}>
            <Toolbar>
                {/* logo section */}
                <Box
                    sx={{
                        display: 'flex',
                        width: 228,
                        alignItems: 'center',
                    }}>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            // letterSpacing: '.3rem',
                            flexGrow: { md: 1 },
                            color: '#1C2472',
                        }}>
                        <span>Fact</span>
                        <span style={{ color: '#6F7BF7' }}>View</span>
                    </Typography>
                    <IconButton
                        size='large'
                        edge='start'
                        aria-label='menu'
                        sx={{ mr: 2 }}
                        onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* header search  */}
                <Paper
                    component='form'
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 400,
                    }}>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder='Search'
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <IconButton sx={{ p: 1 }} aria-label='search'>
                        <SearchIcon />
                    </IconButton>
                </Paper>

                {/* Profile */}
                <Chip
                    sx={{
                        ml: 'auto',
                        height: '48px',
                        alignItems: 'center',
                        borderRadius: '24px',
                        cursor: 'pointer',
                        lineHeight: 0,
                    }}
                    icon={<Avatar src={User1} />}
                    label={<Typography>{user?.name}</Typography>}
                    variant='outlined'
                />
                <Button
                    disableElevation
                    variant='contained'
                    sx={{ ml: 2 }}
                    onClick={handleOnLogout}>
                    {'Logout'}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
