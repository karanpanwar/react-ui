import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from 'src/service/api';
import type { RootState } from 'src/store';

interface CaseState {
    status: 'idle' | 'loading' | 'succeed' | 'failed';
    cases: Case[];
    error: string | Error | null;
    total: number;
}

const initialState: CaseState = {
    status: 'idle',
    cases: [],
    total: 0,
    error: null,
};

export const fetchCases = createAsyncThunk<CaseData, string>(
    'case/fetchCases',
    async (userId) => {
        const response = await api.get(
            'https://nmruv9b3ai.execute-api.us-east-1.amazonaws.com/dev/v2/get-cases',
            {
                params: {
                    userId,
                },
            }
        );
        return response.data as CaseData;
    }
);

export const caseSlice = createSlice({
    name: 'case',
    initialState,
    reducers: {
        // reducers
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCases.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchCases.fulfilled,
                (state, action: PayloadAction<CaseData>) => {
                    state.status = 'succeed';
                    state.cases = action.payload;
                }
            )
            .addCase(fetchCases.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error?.message ?? 'error';
            });
    },
});

// selector
export const selectCase = (state: RootState) => state.case;

// reducer
export default caseSlice.reducer;
