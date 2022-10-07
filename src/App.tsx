import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import Routes from 'src/routes/index';
import store from 'src/store';
import theme from 'src/theme';


const App = () => {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Routes />
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        </>
    );
};

export default App;
