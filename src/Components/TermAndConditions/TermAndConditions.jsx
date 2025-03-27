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
    const [submitting, setSubmitting] = useState(false);
    const { loggedIn } = useSelector((state) => state.auth);
    const user = loggedIn?.user;
    const email = user?.email;

    const isReviewing = new URLSearchParams(location.search).get('review') === 'true';

    const pdfFiles = [
        { file: '/src/assets/Terms/01.pdf', content: 'This is the content for step 1. Lorem ipsum dolor sit amet...' },
        { file: '/src/assets/Terms/02.pdf', content: 'This is the content for step 2. Consectetur adipiscing elit...' },
        { file: '/src/assets/Terms/03.pdf', content: 'This is the content for step 3. Sed do eiusmod tempor incididunt...' }
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
            setSubmitting(true); // Start loading
            axios.post('/onboarding/complete', { email })
                .then(() => {
                    toast.success('Onboarding completed!');
                    navigate('/');
                })
                .catch(() => toast.error('Failed to complete onboarding.'))
                .finally(() => setSubmitting(false)); // Stop loading
        }
    };

    if (loading) return <div className="onboarding-container">Checking status...</div>;

    return (
        <div className="onboarding-container">
            <div className="scrollable-content">
                <p>{pdfFiles[step - 1].content}</p>
            </div>
            <div className="onboarding-footer">
                <a href={pdfFiles[step - 1].file} download className="download-btn">Download PDF</a>
                <button
                    onClick={handleNext}
                    className="agree-btn"
                    disabled={submitting}
                >
                    {submitting ? 'Updating...' : 'Agree & Continue'}
                </button>

            </div>
        </div>
    );
}

export default TermAndConditions;
