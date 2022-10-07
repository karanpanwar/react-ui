import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Paper, IconButton } from '@mui/material';

const Search = () => {
    return (
        <Paper
            variant='outlined'
            sx={{ p: '0 4px', alignSelf: 'center', height: 'fit-content' }}>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Search'
                inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton
                color='primary'
                type='submit'
                sx={{ p: 1 }}
                aria-label='search'>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default Search;
