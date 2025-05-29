import axios from 'axios';

axios.defaults.withCredentials = true;

const BASE_URL = 'https://icyflame-ltd-core.onrender.com/api/v1/auth/vendors/admin';
// const BASE_URL_LOCAL = 'http://localhost:8100/api/v1/admin';

const endpoints = {
    getAllVendors: `${BASE_URL}/vendors`,
    getVendorsByStatus: (status) => `${BASE_URL}/vendors/${status}`,
    updateVendorStatus: (vendorId) => `${BASE_URL}/vendors/${vendorId}/status`,
};

const getAllVendors = async () => {
    try {
        const response = await axios.get(endpoints.getAllVendors);
        return response.data;
    } catch (error) {
        console.error('Get all vendors error:', error.response?.data || error.message);
        throw error;
    }
};

const getVendorsByStatus = async (status) => {
    try {
        const response = await axios.get(endpoints.getVendorsByStatus(status));
        return response.data;
    } catch (error) {
        console.error('Get vendors by status error:', error.response?.data || error.message);
        throw error;
    }
};

const updateVendorStatus = async (vendorId, status) => {
    try {
        const response = await axios.put(endpoints.updateVendorStatus(vendorId), { status });
        return response.data;
    } catch (error) {
        console.error('Update vendor status error:', error.response?.data || error.message);
        throw error;
    }
};

const vendorService = {
    getAllVendors,
    getVendorsByStatus,
    updateVendorStatus,
};

export default vendorService;