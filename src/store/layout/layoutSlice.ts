import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'src/store';

interface LayoutState {
    drawerOpen: boolean;
}

const initialState: LayoutState = {
    drawerOpen: true,
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setDrawer: (state: LayoutState, action: PayloadAction<boolean>) => {
            state.drawerOpen = action.payload;
        },
    },
});

// action
export const { setDrawer } = layoutSlice.actions;

// selector
export const selectLayout = (state: RootState) => state.layout;

// reducer
export default layoutSlice.reducer;
