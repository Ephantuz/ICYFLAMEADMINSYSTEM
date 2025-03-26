import { useEffect } from 'react';
import './verify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { reset, verifyUser } from '../../features/Auth/AuthSlice';
import Spinner from '../../Components/Spinner/Spinner';

function Verify() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { token } = useParams();

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(verifyUser(token));
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (isError) {
            // Call reset here to ensure state is cleared before navigating
            dispatch(reset());

            // display a message
            toast.error(message);

            // Navigate to the login page after a short delay
            setTimeout(() => navigate('/register'), 500);
        }
        if (isSuccess) {
            toast.success(message);
            // Similarly, ensure reset happens before navigation
            dispatch(reset());
            setTimeout(() => {
                navigate('/login');
            }, 9000);
        }
        // Dependencies: isSuccess, isError, and message are needed to trigger this effect
    }, [isSuccess, isError, message, navigate, dispatch]);

    return (
        <div className='verify'>
            {isLoading ? <p><Spinner /> Verifying...</p> : null}
            {isSuccess && <>
                <h4>Your Account Has Successfully been verified</h4>
                <h4>You'll be redirected shortly</h4>
            </>}
            {isError && <h4>Hi! There seems to have been an error while creating your account... {message}</h4>}
        </div>
    );
}

export default Verify;
