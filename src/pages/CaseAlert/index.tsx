import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    Avatar,
    Box,
    Button,
    Container,
    Stack,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';

import AlertList from 'src/pages/AlertList';

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

const CaseAlert = () => {
    const [value, setValue] = React.useState(0);
    const { userDetails, taskId } = useLocation().state as any;

    const [alertsData, setAlertsData] = React.useState<{
        totalAlerts: number;
        totalSubmitted: number;
    }>({ totalAlerts: 0, totalSubmitted: 0 });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleComplete = () => {
        const body = {
            taskId,
        };
        fetch(
            'https://nmruv9b3ai.execute-api.us-east-1.amazonaws.com/dev/complete-task',
            {
                method: 'POST',
                body: JSON.stringify(body),
            }
        ).then((res) => {
            if (res.status === 204) {
                console.log('Completed');
            }
        });
    };

    const handleSetAlertsData = (alerts: Alert[]) => {
        setAlertsData({
            totalAlerts: alerts.length,
            totalSubmitted: alerts.filter((alert) => !!alert.alertResult)
                .length,
        });
    };

    return (
        <Container sx={{ py: 2 }} maxWidth={false}>
            <Box
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '4px',
                    p: 2,
                    backgroundColor: 'background.default',
                }}>
                <Stack
                    spacing={2}
                    direction='row'
                    justifyContent='space-between'>
                    <Box flexDirection='row' display='flex'>
                        <Avatar
                            variant={'square'}
                            sx={{
                                width: 150,
                                height: 150,
                            }}
                        />
                        <Box marginLeft={2}>
                            <Typography variant={'h5'}>
                                {userDetails.name}
                            </Typography>
                            <Typography>{`Birth Date: ${
                                userDetails.dob ?? 'N/A'
                            }`}</Typography>
                            <Typography>{`Email: ${
                                userDetails.email ?? 'N/A'
                            }`}</Typography>
                            <Typography>{`Address: ${
                                userDetails.address ?? 'N/A'
                            }`}</Typography>
                            <Typography>{`Country: ${
                                userDetails.country ?? 'N/A'
                            }`}</Typography>
                        </Box>
                    </Box>
                    {alertsData.totalAlerts > 0 && (
                        <Box
                            display={'flex'}
                            justifyContent='flex-end'
                            flexDirection={'column'}>
                            <Typography>{`Total Alerts: ${alertsData.totalAlerts}`}</Typography>
                            <Typography>{`Total Submitted Alerts: ${alertsData.totalSubmitted}`}</Typography>
                            <Button
                                variant={'contained'}
                                color='success'
                                disabled={
                                    alertsData.totalAlerts !==
                                    alertsData.totalSubmitted
                                }
                                sx={{
                                    alignSelf: 'flex-end',
                                    width: '100%',
                                    mt: 2,
                                }}
                                onClick={handleComplete}>
                                complete
                            </Button>
                        </Box>
                    )}
                </Stack>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab value={0} label='Alert' />
                    <Tab value={1} label='Additional Info' />
                    <Tab value={2} label='Audit Trail' />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AlertList setAlerts={handleSetAlertsData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Additional Info
            </TabPanel>
            <TabPanel value={value} index={2}>
                Audit Trail
            </TabPanel>
        </Container>
    );
};

export default CaseAlert;
