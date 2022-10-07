import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState, AppDispatch } from 'src/store';
import { getLocalData, setLocalData } from 'src/helpers/storage';

import AuthService from 'src/service/authService';

// Define types for authSlice
interface User {
    id: string;
    name: string;
    email: string;
    token: string;
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    error: Error | string | null;
}

const user = getLocalData('user');

// Define the initial state
const initialState: AuthState = {
    user: user,
    error: null,
    ...(user ? { isLoggedIn: true } : { isLoggedIn: false }),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state: AuthState, action: PayloadAction<User>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            setLocalData('user', action.payload);
        },
        loginFail: (
            state: AuthState,
            action: PayloadAction<string | undefined>
        ) => {
            state.isLoggedIn = false;
            state.user = null;
            if (action?.payload) state.error = action.payload;
        },
        logout: (state: AuthState) => {
            state.isLoggedIn = false;
            state.user = null;
            AuthService.logout();
        },
    },
});

// actions
export const { loginSuccess, loginFail, logout } = authSlice.actions;

export const login =
    ({ email, password }: { email: string; password: string }) =>
    async (dispatch: AppDispatch) => {
        try {
            const response: any = await AuthService.login(email, password);
            if (response && response.message === 'success') {
                const data = {
                    id: response.data.Id,
                    name: response.data.Name,
                    email: response.data.Email,
                    token: response.data.Token,
                };
                dispatch(loginSuccess(data));
            } else {
                console.log('error', response);
                dispatch(loginFail(response.message));
            }
        } catch (err) {
            dispatch(loginFail(err.message));
        }
    };

// selector
export const selectAuth = (state: RootState) => state.auth;

// reducer
export default authSlice.reducer;
