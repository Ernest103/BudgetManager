import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function RequireAuth({ children }) {
    const location = useLocation();
    const { status } = useAuth();

    if (status === 'loading') {
        return <p>Checking session...</p>;
    }

    if (status === 'unauthenticated') {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}