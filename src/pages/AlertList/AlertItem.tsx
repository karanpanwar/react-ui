import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    Chip,
    Collapse,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    ToggleButton,
    Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import FileUpload from 'src/component/FileUpload';

import { useAppSelector } from 'src/hooks/hooks';
import { selectAuth } from 'src/store/auth/authSlice';

interface AlertComplete {
    comment: string;
    feedback: string;
}

type AlertItemProps = {
    alertData: Alert;
    getTaskAlerts: () => void;
};

const schema = yup.object({
    comment: yup.string(),
    feedback: yup.string().required('Feedback selection required'),
});

const AlertItem = ({ alertData, getTaskAlerts }: AlertItemProps) => {
    const { id, score, dueDate, alertResult, userDetails, comments } =
        alertData;

    const comment =
        Array.isArray(comments) && comments.length > 0
            ? comments[0].comment
            : '';

    // state
    const [open, setOpen] = useState(false);
    const [isVisible, setIsVisible] = React.useState(false);

    // redux
    const auth = useAppSelector(selectAuth);
    const user = auth.user;

    // form
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AlertComplete>({
        resolver: yupResolver(schema),
        defaultValues: {
            comment: comment,
            feedback: alertResult ?? '',
        },
    });

    const submitAPI: SubmitHandler<AlertComplete> = ({ feedback, comment }) => {
        const body = {
            alertId: id,
            action: feedback,
            comment: comment,
            userId: user?.name,
        };

        // if (task.formKey === 'app2L3ReviewerForm') {
        //     body.variables[0].id = 'final_action';
        //     body.variables[0].name = 'final_action';
        // }

        fetch(
            'https://nmruv9b3ai.execute-api.us-east-1.amazonaws.com/dev/v1/complete-alert',
            {
                method: 'POST',
                body: JSON.stringify(body),
            }
        ).then((res) => {
            if (res.status === 204) {
                setIsVisible(true);
                setVisibleAfterDelay();
                getTaskAlerts();
            }
        });
    };

    const setVisibleAfterDelay = () => {
        setTimeout(() => setIsVisible(false), 2000);
    };

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Card
            sx={{
                mb: 2,
            }}
            variant={'outlined'}>
            {isVisible && (
                <Alert severity='success' sx={{ mb: 2 }}>
                    Alert submitted
                </Alert>
            )}
            <Stack
                sx={{ p: 2 }}
                direction='row'
                alignItems='center'
                spacing={2}>
                <div style={{ marginRight: '16px' }}>
                    <Avatar>{score}</Avatar>
                </div>
                <div style={{ flex: 1 }}>
                    <Typography variant={'h6'} color='text.primary'>
                        {userDetails.name}
                    </Typography>
                </div>
                <div style={{ flex: 1 }}>
                    <Typography variant={'body2'} color='text.secondary'>
                        Due Date:{' '}
                        {new Date(
                            dueDate ? dueDate : new Date()
                        ).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                        })}
                    </Typography>
                </div>
                <div style={{ flex: 1 }}>
                    <Typography variant={'body2'}>
                        {`Alert Reviewed: ${alertResult}`}
                    </Typography>
                </div>
                <div style={{ flex: 1 }}>
                    <Chip label={'Assigned'} />
                </div>
                <ToggleButton
                    value={open}
                    selected={open}
                    size='small'
                    aria-label='expand'
                    sx={{ borderRadius: 3 }}
                    onClick={handleClick}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ToggleButton>
            </Stack>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        p: 2,
                        pt: 1,
                    }}
                    component='form'
                    onSubmit={handleSubmit(submitAPI)}>
                    <FormLabel id='alert-user-details'>
                        Alert User Details
                    </FormLabel>
                    <Box display='flex' flexDirection='row' pb={1}>
                        <Typography>{`Birth Date: ${
                            userDetails.dob ?? 'N/A'
                        }`}</Typography>
                        <Divider
                            sx={{ mx: 2 }}
                            orientation='vertical'
                            flexItem
                        />
                        <Typography>{`Type: ${
                            userDetails.type ?? 'N/A'
                        }`}</Typography>
                        <Divider
                            sx={{ mx: 2 }}
                            orientation='vertical'
                            flexItem
                        />
                        <Typography>{`Address: ${
                            userDetails.address ?? 'N/A'
                        }`}</Typography>
                    </Box>

                    <FormControl sx={{ mb: 1 }}>
                        <Controller
                            name='comment'
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    disabled={!!comment}
                                    id='outlined-textarea'
                                    placeholder='Add Comment'
                                    rows={3}
                                    multiline
                                    sx={{ maxWidth: '400px' }}
                                    {...field}
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl
                        error={!!errors.feedback}
                        focused={false}
                        sx={{ mb: 1 }}>
                        <FormLabel id='feedback-label'>Review</FormLabel>
                        <Controller
                            name='feedback'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <RadioGroup
                                    row
                                    aria-labelledby='feedback-label'
                                    sx={{ pl: '10px' }}
                                    {...field}>
                                    <FormControlLabel
                                        value='Alert FalsePositive'
                                        componentsProps={{
                                            typography: {
                                                color: 'error.dark',
                                                pr: 1,
                                            },
                                        }}
                                        disabled={!!alertResult}
                                        control={
                                            <Radio color='error' size='small' />
                                        }
                                        label='False Positive'
                                    />
                                    <FormControlLabel
                                        value='Alert TruePositive'
                                        disabled={!!alertResult}
                                        componentsProps={{
                                            typography: {
                                                color: 'success.dark',
                                                pr: 1,
                                            },
                                        }}
                                        control={
                                            <Radio
                                                color='success'
                                                size='small'
                                            />
                                        }
                                        label={'True Positive'}
                                    />
                                    <FormControlLabel
                                        value='Alert Unknown'
                                        disabled={!!alertResult}
                                        componentsProps={{
                                            typography: {
                                                pr: 1,
                                            },
                                        }}
                                        control={
                                            <Radio
                                                color='default'
                                                size='small'
                                            />
                                        }
                                        label={'Unknown'}
                                    />
                                </RadioGroup>
                            )}
                        />
                        <FormHelperText>
                            {errors.feedback?.message}
                        </FormHelperText>
                        {alertResult && (
                            <FormHelperText>
                                Alert already reviewed.
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FileUpload />
                    <Button
                        variant='contained'
                        type='submit'
                        disabled={!!alertResult}
                        sx={{
                            alignSelf: 'flex-end',
                        }}>
                        {'Submit'}
                    </Button>
                </Box>
            </Collapse>
        </Card>
    );
};

export default AlertItem;
