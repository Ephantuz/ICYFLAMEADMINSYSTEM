import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './TermAndConditions.css';

axios.defaults.baseURL = 'https://icyflame-ltd-core.onrender.com/api/v1/auth/vendors';

function TermAndConditions() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const { loggedIn } = useSelector((state) => state.auth);
    const user = loggedIn?.user;
    const email = user?.email;

    const isReviewing = new URLSearchParams(location.search).get('review') === 'true';

    const pdfFiles = [
        '/src/assets/Terms/01.pdf',
        '/src/assets/Terms/02.pdf',
        '/src/assets/Terms/03.pdf'
    ];

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
                    navigate('/');
                } else {
                    setLoading(false);
                }
            })
            .catch(error => {
                toast.error(error.response?.data?.message || 'Error checking onboarding status');
                setLoading(false);
            });
    }, [navigate, email, loggedIn, isReviewing]);

    const handleNext = () => {
        if (!email) return toast.error('User email missing.');

        if (step < pdfFiles.length) {
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
            <iframe
                src={pdfFiles[step - 1]}
                width="100%"
                height="500px"
                title="Terms and Conditions"
            ></iframe>
            <div className="onboarding-footer">
                <a href={pdfFiles[step - 1]} download className="download-btn">Download</a>
                <button onClick={handleNext} className="agree-btn">Agree & Continue</button>
            </div>
        </div>
    );
}

export default TermAndConditions;
