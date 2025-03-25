// ProtectedLoginRoute.jsx
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginStatus, reset } from '../features/Auth/AuthSlice';


const ProtectedLoginRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { loggedIn, isLoading, isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkLoginStatus());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            dispatch(reset()); // Reset the state after showing the toast
        }
    }, [isError, dispatch]);

    // Show a loading state while checking
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return loggedIn ? <Navigate to="/" replace /> : children;
};

export default ProtectedLoginRoute;
