import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import LoadingIndicator from '../loading/LoadingIndicator'

function LoggedInReRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingIndicator />
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default LoggedInReRoute;