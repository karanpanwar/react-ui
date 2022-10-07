import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'src/store/auth/authSlice';
import layoutReducer from 'src/store/layout/layoutSlice';
import caseReducer from 'src/store/case/caseSlice';
import alertReducer from 'src/store/alert/alertSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        layout: layoutReducer,
        case: caseReducer,
        alert: alertReducer,
    },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: AuthState, layout: LayoutState}
export type AppDispatch = typeof store.dispatch;
