import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    const { tokens } = useAuth();
    

    if (!tokens) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default PrivateRoute;