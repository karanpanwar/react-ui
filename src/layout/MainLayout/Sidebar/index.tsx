import React from 'react';
import { Box, Drawer, useMediaQuery } from '@mui/material';

import type { Theme } from 'src/theme';
import MenuList from './MenuList';

const drawerWidth = 240;

interface SidebarProps {
    drawerOpen: boolean;
    drawerToggle: () => void;
    window?: () => Window;
}

const Sidebar = ({ drawerOpen, drawerToggle, window }: SidebarProps) => {
    const matchUpMd = useMediaQuery<Theme>((theme) =>
        theme.breakpoints.up('md')
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            component='nav'
            sx={{
                flexShrink: { md: 0 },
                width: matchUpMd ? drawerWidth : 'auto',
            }}
            aria-label='sidebar'>
            <Drawer
                open={drawerOpen}
                onClose={drawerToggle}
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor='left'
                color='inherit'
                ModalProps={{ keepMounted: true }}
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        top: {
                            md: '65px',
                        },
                    },
                }}>
                <MenuList />
            </Drawer>
        </Box>
    );
};

export default Sidebar;
