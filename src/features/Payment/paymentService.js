import axios from 'axios';

const API_URL = 'https://multivendorecommerce.onrender.com/api/v1/getway/payment'; // Update this URL if needed

// Send payment request
const pay = async (formData) => {
    const response = await axios.post(`${API_URL}/paymentGetway`, formData);
    return response.data;
};

// Create an async function to handle the payment callback
const handleCallback = async (callbackData) => {
    const response = await axios.post(`${API_URL}/callback`, callbackData);
    return response.data;
};

const authService = {
    pay,
    handleCallback,
};

export default authService;
