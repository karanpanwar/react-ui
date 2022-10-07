import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from 'src/service/api';
import type { RootState } from 'src/store';

interface AlertCase {
    status: 'idle' | 'loading' | 'succeed' | 'failed';
    alerts: Alert[];
    error: string | Error | null;
    total: number;
}

const initialState: AlertCase = {
    status: 'idle',
    alerts: [],
    error: null,
    total: 0,
};

export const fetchAlerts = createAsyncThunk<
    AlertData,
    { userId: string; caseId: string; limit: string }
>('alert/fetchAlerts', async ({ userId, caseId, limit }) => {
    const response = await api.get(
        'https://nmruv9b3ai.execute-api.us-east-1.amazonaws.com/dev/v1/get-alerts',
        { params: { userId, caseId, limit } }
    );
    return response.data;
});

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        // reducers
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlerts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchAlerts.fulfilled,
                (state, action: PayloadAction<AlertData>) => {
                    state.status = 'succeed';
                    state.alerts = action.payload.data;
                }
            )
            .addCase(fetchAlerts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error?.message ?? 'error';
            });
    },
});

// selector
export const selectAlert = (state: RootState) => state.alert;

// reducer
export default alertSlice.reducer;
