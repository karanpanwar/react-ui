import React from 'react';

import { Container } from '@mui/material';

import GridView from 'src/component/GridView';

const Report = () => (
    <Container sx={{ py: 2 }} maxWidth={false}>
        <p>Report Container</p>
        <GridView />
    </Container>
);

export default Report;
