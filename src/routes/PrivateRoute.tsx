import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isReady } = useAuth();

    if (!isReady) {
        return null;
    }

    return isAuthenticated ? <>{children}</> : <Navigate to='/login' />;
};

export default PrivateRoute;
