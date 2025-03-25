// ProtectedLoginRoute.jsx
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginStatus } from '../features/Auth/AuthSlice';

const ProtectedLoginRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { loggedIn, isLoading } = useSelector((state) => state.auth);

    useEffect(() => {
        // Check login status when the component mounts
        dispatch(checkLoginStatus());
    }, [dispatch]);

    // Show a loading state while checking
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return loggedIn ? <Navigate to="/" replace /> : children;
};

export default ProtectedLoginRoute;
