import React from 'react';

import MinimalLayout from 'src/layout/MinimalLayout/index';
import Login from 'src/pages/Login';

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <Login />,
        },
    ],
};

export default AuthenticationRoutes;
