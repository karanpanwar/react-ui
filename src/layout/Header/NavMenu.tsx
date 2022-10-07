import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';

interface NavMenuProps {
  routes: AppRoute[];
}

const NavMenu = ({ routes }: NavMenuProps) => {
  return (
    <>
      {routes.map(({ pathName, name }) => (
        <Link
          key={name}
          style={{ textDecoration: 'none', color: 'white' }}
          to={pathName}>
          <Button sx={{ my: 2, color: 'white', display: 'block' }}>
            {name}
          </Button>
        </Link>
      ))}
    </>
  );
};

export default memo(NavMenu);
