import React, { useEffect, useState, useCallback } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Popover,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

import Loader from 'src/component/Loader';
import CaseItem from 'src/pages/CaseList/CaseItem';

import { useAppSelector, useAppDispatch } from 'src/hooks/hooks';
import { selectAuth } from 'src/store/auth/authSlice';
import { fetchCases, selectCase } from 'src/store/case/caseSlice';

const CaseList = () => {
    // state
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    // redux store
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(selectAuth);
    const { status, cases } = useAppSelector(selectCase);

    // util
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getCases = () => {
        if (user && status === 'idle') {
            dispatch(fetchCases(user.name));
        }
    };

    useEffect(() => {
        getCases();
    }, [status, dispatch]);

    const mapCaseItem = useCallback(
        (data: Case, index: number) => (
            <CaseItem
                key={'case' + index}
                caseData={data}
                getCases={getCases}
            />
        ),
        []
    );

    let content;
    if (status === 'loading') {
        content = <Loader />;
    } else if (status === 'succeed') {
        content = cases.map(mapCaseItem);
    } else if (status === 'failed') {
        content = (
            <Typography component={'div'}>Something Went Wrong</Typography>
        );
    }

    return (
        <Container sx={{ py: 2 }} maxWidth={false}>
            <Box display={'flex'}>
                <Box flex={'1'}>
                    <Typography variant='h5'>Cases</Typography>
                    <Typography variant='body1' sx={{ marginBottom: 1 }}>
                        These are the cases.
                    </Typography>
                </Box>
                <Button
                    disableElevation
                    sx={{ height: 'fit-content', alignSelf: 'center' }}
                    aria-describedby={id}
                    variant='contained'
                    startIcon={<FilterListIcon />}
                    onClick={handleClick}>
                    Filters
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}>
                    <FormGroup sx={{ p: 2 }}>
                        <FormControlLabel
                            control={<Checkbox />}
                            label='High Priority'
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label='Low Priority'
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label='Assigned'
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label='Unassigned'
                        />
                    </FormGroup>
                </Popover>
            </Box>
            {content}
        </Container>
    );
};

export default CaseList;
