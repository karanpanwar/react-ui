import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import FilterListIcon from '@mui/icons-material/FilterList';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Popover,
    Typography,
} from '@mui/material';

import Loader from 'src/component/Loader';
import AlertItem from 'src/pages/AlertList/AlertItem';

import Search from 'src/component/Search';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { selectAuth } from 'src/store/auth/authSlice';
import { fetchAlerts, selectAlert } from 'src/store/alert/alertSlice';

interface AlertListProps {
    setAlerts: (alerts: Alert[]) => void;
}

const AlertList = ({ setAlerts }: AlertListProps) => {
    // state
    const [filterEl, setFilterEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    // redux
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(selectAuth);
    const { status, alerts } = useAppSelector(selectAlert);

    // router
    const location = useLocation();
    const { caseId } = location.state as { caseId: string };

    // util
    const open = Boolean(filterEl);
    const id = open ? 'simple-popover' : undefined;

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFilterEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterEl(null);
    };

    const getTaskAlerts = () => {
        if (user && status === 'idle') {
            dispatch(
                fetchAlerts({
                    caseId,
                    limit: '100',
                    userId: user.name,
                })
            )
                .unwrap()
                .then(
                    (data) => {
                        setAlerts(data.data);
                    },
                    () => ({})
                );
        }
    };

    useEffect(() => {
        getTaskAlerts();
    }, [status, dispatch]);

    const mapAlertItem = (alert: Alert, index: number) => (
        <AlertItem
            key={'alert' + index}
            alertData={alert}
            getTaskAlerts={getTaskAlerts}
        />
    );

    let content;
    if (status === 'loading') {
        content = <Loader />;
    } else if (status === 'succeed') {
        content = alerts.map(mapAlertItem);
    } else if (status === 'failed') {
        content = (
            <Typography component={'div'}>Something Went Wrong</Typography>
        );
    }

    return (
        <>
            <Box display={'flex'}>
                <Box flex={'1'}>
                    <Typography variant='h5'>Alerts</Typography>
                    <Typography variant='body1' sx={{ marginBottom: 1 }}>
                        These are the alerts.
                    </Typography>
                </Box>
                <Search />
                <Button
                    disableElevation
                    sx={{ height: 'fit-content', alignSelf: 'center', ml: 2 }}
                    aria-describedby={id}
                    variant='contained'
                    startIcon={<FilterListIcon />}
                    onClick={handleFilterClick}>
                    Filters
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={filterEl}
                    onClose={handleFilterClose}
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
        </>
    );
};

export default AlertList;
