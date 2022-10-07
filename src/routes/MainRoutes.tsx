import React from 'react';
import MainLayout from 'src/layout/MainLayout';
import NoMatch from 'src/pages/NoMatch';
import Cases from 'src/pages/CaseList';
import CaseAlert from 'src/pages/CaseAlert';
import Report from 'src/pages/Report';
import Rule from 'src/pages/Rule';

import ProtectedRoute from 'src/routes/ProtectedRoute';

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: (
                <ProtectedRoute>
                    <Cases />
                </ProtectedRoute>
            ),
        },
        {
            path: 'case/:id',
            element: (
                <ProtectedRoute>
                    <CaseAlert />
                </ProtectedRoute>
            ),
        },
        {
            path: '/report',
            element: (
                <ProtectedRoute>
                    <Report />
                </ProtectedRoute>
            ),
        },
        {
            path: '/rule',
            element: (
                <ProtectedRoute>
                    <Rule />
                </ProtectedRoute>
            ),
        },
        {
            path: '*',
            element: <NoMatch />,
        },
    ],
};

export default MainRoutes;
