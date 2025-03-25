import axios from 'axios';

axios.defaults.withCredentials = true;

const BASE_URL = 'https://icyflame-ltd-core.onrender.com/api/v1/auth/vendors/';
const RESET_BASE_URL = 'https://icyflame-ltd-core.onrender.com/api/auth/adminstration/sales/config/';

// Simplifying API endpoints
const endpoints = {
    register: `${BASE_URL}register`,
    login: `${BASE_URL}login`,
    verify: `${BASE_URL}verify/`,
    loginStatus: `${BASE_URL}loginstatus/`,
    logoutUser: `${BASE_URL}logout/`,
    resetByEmail: `${RESET_BASE_URL}resetbymail`,
    resetPassword: `${RESET_BASE_URL}resetpassword`,
    updateUser: `${BASE_URL}config/`,
};
// Utilize try/catch for async operations
const register = async (userData) => {
    try {
        const response = await axios.post(endpoints.register, userData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Register error:', error.response.data);
        throw error;
    }
};

const verifyUser = async (token) => {
    try {
        const response = await axios.get(`${endpoints.verify}${token}`);
        return response.data;
    } catch (error) {
        console.error('Verification error:', error.response.data);
        throw error;
    }
};
const update = async (userData, id) => {
    try {
        console.log('Endpoint:', `${endpoints.updateUser}${id}`);
        const response = await axios.put(`${endpoints.updateUser}${id}`, userData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Update error:', error.response.data);
        } else {
            console.error('Update error:', error.message);
        }
        throw error;
    }
};


const isLoggedIn = async () => {
    try {
        const response = await axios.get(endpoints.loginStatus);
        return response.data;
    } catch (error) {
        console.error('Login status error:', error.response.data);
        throw error;
    }
};
const LogOut = async () => {
    try {
        const response = await axios.post(endpoints.logoutUser);
        return response.data;
    } catch (error) {
        console.error('Logout status error:', error.response.data);
        throw error;
    }
};

const resetUser = async (resetData) => {
    try {
        const response = await axios.post(endpoints.resetByEmail, resetData);
        return response.data;
    } catch (error) {
        console.error('Reset user error:', error.response.data);
        throw error;
    }
};

const resetUserPassword = async (resetPasswordInfo) => {
    try {
        const response = await axios.post(endpoints.resetPassword, resetPasswordInfo);
        return response.data;
    } catch (error) {
        console.error('Reset password error:', error.response.data);
        throw error;
    }
};

const login = async (userData) => {
    try {
        const response = await axios.post(endpoints.login, userData);
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response.data);
        throw error;
    }
};
const authService = {
    register,
    verifyUser,
    isLoggedIn,
    resetUser,
    resetUserPassword,
    login,
    LogOut,
    update
};

export default authService;