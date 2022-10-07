import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { MenuItem, Typography } from '@mui/material';

interface NavMenuXsProps {
    routes: AppRoute[];
    handleCloseNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

const NavMenuXs = ({ routes, handleCloseNavMenu }: NavMenuXsProps) => {
    const location = useLocation();

    return (
        <>
            {routes.map(({ pathName, name }) => (
                <MenuItem
                    key={name}
                    onClick={handleCloseNavMenu}
                    selected={pathName === location.pathname}>
                    <Typography textAlign='center'>
                        <Link
                            to={pathName}
                            style={{ textDecoration: 'none', color: 'black' }}>
                            {name}
                        </Link>
                    </Typography>
                </MenuItem>
            ))}
        </>
    );
};

export default memo(NavMenuXs);
