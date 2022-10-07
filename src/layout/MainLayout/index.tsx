import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

import Header from 'src/layout/MainLayout/Header';
import Sidebar from 'src/layout/MainLayout/Sidebar';

import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { selectAuth } from 'src/store/auth/authSlice';
import { selectLayout, setDrawer } from 'src/store/layout/layoutSlice';
import type { Theme } from 'src/theme';

const drawerWidth = 240;

//--- Main Container ---//
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    minHeight: 'calc(100vh - 65px)',
    marginTop: '65px',
    marginLeft: `-${drawerWidth}px`,
    backgroundColor: theme.palette.grey[50],
    [theme.breakpoints.down('md')]: {
        marginLeft: 0,
    },
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const MainLayout = () => {
    // theme
    const matchDownMd = useMediaQuery<Theme>((theme) =>
        theme.breakpoints.down('lg')
    );

    // redux
    const { drawerOpen } = useAppSelector(selectLayout);
    const { user } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const handleDrawerToggle = () => {
        dispatch(setDrawer(!drawerOpen));
    };

    useEffect(() => {
        dispatch(setDrawer(!matchDownMd));
    }, [matchDownMd]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Header handleDrawerToggle={handleDrawerToggle} user={user} />
            <Sidebar
                drawerOpen={drawerOpen}
                drawerToggle={handleDrawerToggle}
            />
            <Main open={drawerOpen}>
                <Outlet />
            </Main>
        </Box>
    );
};

export default MainLayout;
