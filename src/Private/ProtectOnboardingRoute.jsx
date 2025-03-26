// OnboardingProtectRoute.jsx
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const OnboardingProtectRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { isLoading, loggedIn } = useSelector((state) => state.auth);
    const [onboardingStatus, setOnboardingStatus] = useState(null);

    useEffect(() => {
        if (loggedIn && loggedIn.user?.email) {
            axios.get(`http://localhost:8100/api/v1/auth/vendors/onboarding/${loggedIn.user.email}`)
                .then(response => {
                    setOnboardingStatus(response.data.hasOnboarded);
                })
                .catch(error => {
                    toast.error("Failed to check onboarding status.");
                    setOnboardingStatus(false);
                });
        } else {
            setOnboardingStatus(false); // User not logged in or no email, force onboarding
        }
    }, [loggedIn]);

    // Ensure loading state is properly handled
    if (isLoading || onboardingStatus === null) {
        return <div>Loading...</div>;
    }

    // Redirect if the user has NOT onboarded
    if (!onboardingStatus) {
        return <Navigate to="/onboarding" replace />;
    }

    // If user has onboarded, allow access
    return children;
};

export default OnboardingProtectRoute;
