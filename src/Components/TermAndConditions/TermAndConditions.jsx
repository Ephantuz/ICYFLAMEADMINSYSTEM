import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './TermAndConditions.css';

axios.defaults.baseURL = 'http://localhost:8100/api/v1/auth/vendors';

function TermAndConditions() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // Get user details from Redux
    const { loggedIn } = useSelector((state) => state.auth);
    const user = loggedIn?.user;
    const email = user?.email;

    const isReviewing = new URLSearchParams(location.search).get('review') === 'true';

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
            return;
        }

        if (!email) {
            toast.error('User email not found.');
            return;
        }

        axios.get(`/onboarding/${email}`)
            .then(response => {
                if (response.data.hasOnboarded && !isReviewing) {
                    navigate('/');  // Redirect only if not reviewing
                } else {
                    setLoading(false);
                }
            })
            .catch(error => {
                toast.error(error.response?.data?.message || 'Error checking onboarding status');
                setLoading(false);
            });
    }, [navigate, email, loggedIn, isReviewing]); // Include `isReviewing` dependency

    const handleNext = () => {
        if (!email) return toast.error('User email missing.');

        if (step < 3) {
            setStep(prev => prev + 1);
        } else {
            axios.post('/onboarding/complete', { email })
                .then(() => {
                    toast.success('Onboarding completed!');
                    navigate('/');
                })
                .catch(() => toast.error('Failed to complete onboarding.'));
        }
    };

    if (loading) return <div className="onboarding-container">Checking status...</div>;

    return (
        <div className="onboarding-container">
            {step === 1 && <div className="onboarding-card"><p>Step 1: Read this first document.</p></div>}
            {step === 2 && <div className="onboarding-card"><p>Step 2: Read this second document.</p></div>}
            {step === 3 && <div className="onboarding-card"><p>Step 3: Final agreement.</p></div>}

            <button onClick={handleNext} className="agree-btn">Agree & Continue</button>
        </div>
    );
}

export default TermAndConditions;
