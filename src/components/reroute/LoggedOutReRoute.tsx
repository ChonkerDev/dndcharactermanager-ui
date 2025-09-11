import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import LoadingIndicator from '../loading/LoadingIndicator'

function LoggedOutReRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingIndicator />
    }

    if (!user) {
        return <Navigate to="/Login" replace />;
    }

    return <Outlet />;
}

export default LoggedOutReRoute;