import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { login, selectAuth } from 'src/store/auth/authSlice';

interface ILoginFormInput {
    email: string;
    password: string;
}

const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required('Enter a valid password'),
});

const Login = () => {
    const [error, showError] = useState(false);
    const [message, setMessage] = useState('');
    // router
    // const location = useLocation();
    // const state = location.state as { from: Location };

    // redux store
    const dispatch = useAppDispatch();
    const auth = useAppSelector(selectAuth);

    // form
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginFormInput>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<ILoginFormInput> = ({ email, password }) => {
        setMessage('');
        dispatch(login({ email, password }));
    };

    if (auth.isLoggedIn) {
        // const origin = state?.from?.pathname || '/';
        return <Navigate to={'/'} replace />;
    }

    useEffect( () => {
        if(auth.error) {
            showError(true);
            setMessage(`${auth.error}`);
        }   
        console.log("useEffect", auth);
        }, [auth.error, message])
    return (
        <Container component='main' maxWidth='xs'>
            <Snackbar open={error}
                    autoHideDuration={6000}
                    onClose={()=> {
                        showError(false)
                    }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                <Alert
                    onClose={()=> {
                        showError(false)
                    }}
                    severity='error'
                    sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <Box
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ mt: 1, width: '100%' }}>
                    <Controller
                        name='email'
                        control={control}
                        rules={{ required: true }}
                        defaultValue={''}
                        render={({ field }) => (
                            <TextField
                                id='email'
                                label='Email Address'
                                size='small'
                                autoFocus
                                required
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name='password'
                        control={control}
                        rules={{ required: true }}
                        defaultValue={''}
                        render={({ field }) => (
                            <TextField
                                id='password'
                                label='Password'
                                type='password'
                                size='small'
                                margin='normal'
                                required
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                {...field}
                            />
                        )}
                    />
                    <Grid container sx={{ justifyContent: 'space-between' }}>
                        <Grid item>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='remember'
                                        color='primary'
                                    />
                                }
                                label='Remember me'
                            />
                        </Grid>
                        {/* <Grid
                            item
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                            }}>
                            <Link href='#' underline='none' align='center'>
                                Forgot password?
                            </Link>
                        </Grid> */}
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 2, mb: 2 }}>
                        Sign In
                    </Button>
                    {/* <Typography>
                        Don&apos;t have an account?{' '}
                        <Link
                            variant='body1'
                            component='button'
                            underline='none'>
                            Register
                        </Link>
                    </Typography> */}
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
