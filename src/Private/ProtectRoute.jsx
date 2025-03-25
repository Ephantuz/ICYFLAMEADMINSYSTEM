// ProtectRoute.jsx
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkLoginStatus } from '../features/Auth/AuthSlice';
// import Spinner from '../Components/Spinner/Spinner';


const ProtectRoute = ({ children }) => {
    const dispatch = useDispatch()
    const { isLoading, loggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkLoginStatus());
    }, [dispatch]);

    if (isLoading) {
        return <>
            <div>Loading...</div>
        </>;
    }

    return loggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectRoute;
