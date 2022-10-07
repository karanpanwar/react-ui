import React from 'react';

import {Box, CircularProgress} from '@mui/material';

const Loader = () => (
  <Box
    sx={{
      display: 'flex',
      flexGrow: '1',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }}>
    <CircularProgress />
  </Box>
);

export default Loader;
