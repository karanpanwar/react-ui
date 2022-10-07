import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box,
    Button,
    Card,
    Chip,
    Stack,
    Typography,
} from '@mui/material';

import { useAppSelector } from 'src/hooks/hooks';
import { selectAuth } from 'src/store/auth/authSlice';

interface CaseItemProps {
    caseData: Case;
    getCases: () => void;
}

const CaseItem = ({ caseData, getCases }: CaseItemProps) => {
    const navigate = useNavigate();
    const auth = useAppSelector(selectAuth);
    const user = auth.user;

    const {
        caseId,
        state,
        priority,
        dueDate,
        score,
        isAssignable,
        totalAlerts,
        assignee,
        taskId,
        userDetails,
    } = caseData;

    const assignCase = () => {
        const body = JSON.stringify({ caseId, assignee: user?.name });
        fetch(
            'https://nmruv9b3ai.execute-api.us-east-1.amazonaws.com/dev/v1/assign-case',
            {
                method: 'POST',
                body,
            }
        ).then((res) => {
            if (res.status === 204) {
                getCases();
            }
        });
    };

    const handleOnCardClick = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            navigate(`/case/${caseId}`, {
                state: { userDetails, caseId, taskId },
            });
        },
        []
    );

    const handleOnAssignClick = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            assignCase();
        },
        []
    );

    return (
        <Card
            sx={{
                mb: 2,
                cursor: 'pointer',
                ...(isAssignable || (!isAssignable && assignee !== user?.name)
                    ? { pointerEvents: 'none' }
                    : {}),
            }}
            variant={'outlined'}
            onClick={handleOnCardClick}>
            <Stack
                sx={{ p: 2 }}
                direction='row'
                alignItems='center'
                spacing={2}>
                <Box>
                    <Avatar>{score}</Avatar>
                </Box>
                <Box sx={{ flex: 3 }}>
                    <Typography variant={'h6'} color='text.primary'>
                        {userDetails.name}
                    </Typography>
                    <Typography variant={'body2'} color='text.secondary'>
                        Open Alerts: {totalAlerts}
                    </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant={'body2'} color='error.main'>
                        {priority}
                    </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant={'body2'}>
                        Due Date:{' '}
                        {new Date(dueDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                        })}
                    </Typography>
                </Box>
                <Box sx={{ flex: 1, margin: '0 auto' }}>
                    <Chip label={state} />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: 'inline-flex',
                        justifyContent: 'flex-end',
                    }}>
                    {isAssignable ? (
                        <Button
                            sx={{ pointerEvents: 'auto' }}
                            variant='contained'
                            onClick={handleOnAssignClick}>
                            {'Assign'}
                        </Button>
                    ) : (
                        <Button
                            sx={{ pointerEvents: 'none' }}
                            variant='outlined'
                            disabled>
                            {'Assigned'}
                        </Button>
                    )}
                </Box>
            </Stack>
        </Card>
    );
};

export default CaseItem;
