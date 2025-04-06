import './Login.css';
import { TbArrowBackUp } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { BiSolidLogInCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from '../../features/Auth/AuthSlice';


function Login() {
    const [showSignUp, setShowSignUp] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, loggedIn, message, messageverify } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // console.log(message);


    const { password, email } = formData;
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (isError && !isSuccess) {
            toast.error(message || messageverify, { toastId: 'error-toast' });
            dispatch(reset());
        }
        if (isSuccess) {
            setFormData({ email: '', password: '' });
            navigate(from, { replace: true });
        }

        return () => {
            dispatch(reset());
        };
    }, [isError, isSuccess, message, dispatch, navigate, from, loggedIn, messageverify]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
        };
        dispatch(login(userData));
    };

    const handleSignUpClick = () => {
        setShowSignUp(true);
    };

    const handleHomeClick = () => {
        setShowSignUp(false); // Reset state when navigating to home
    };

    return (
        <div className={`Login ${showSignUp ? 'slide-out' : ''}`}>
            {/* Sign Up Button */}
            {!showSignUp && (
                <div className="LoginHighlight">
                    <div className="LoginImage">
                        <img src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg?t=st=1742911262~exp=1742914862~hmac=4b5bc841ed1a2551e07d72cb6e62c6287e5799fbae8a9b99db295bc118104e50&w=740" alt="" />
                    </div>
                    <div className="SwipeButton" onClick={handleSignUpClick}>
                        Let's Login
                    </div>
                </div>
            )}

            {/* Sign-Up Form */}
            <div className={`SignUpForm ${showSignUp ? 'slide-in' : ''}`}>
                {showSignUp && (
                    <>
                        <Link to='/login' onClick={handleHomeClick} className='BodyBackSignTop'>
                            <TbArrowBackUp className='BackSign' /> Back home
                        </Link>
                        <>
                            <div className="LoginCard">
                                <form onSubmit={onSubmit}>
                                    <div className="coolinput">
                                        <label htmlFor="input" className="text">Email:</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            name="email"
                                            className="input"
                                            value={email}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="coolinput">
                                        <label htmlFor="input" className="text">Password:</label>
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            name="password"
                                            className="input"
                                            value={password}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>

                                    <br />
                                    <div className="NavLogCover2">
                                        <button className='BodyBackSign' type="submit">
                                            <BiSolidLogInCircle className='BackSign' /> Let's log you in
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {isLoading && <p>Loading...</p>}
                            {isError && <p>Error: {message || "An error occurred"}</p>}
                            <br />
                            <div className="NavLogCover">
                                <div className="or">or</div>
                                <Link to='/register' className='BodyBackSign'>
                                    <VscGitPullRequestCreate className='BackSign' /> Create new account
                                </Link>
                                <p>Create a new account if you don't have one. The Admin will approve you after successful registration.</p>
                            </div>
                        </>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;
