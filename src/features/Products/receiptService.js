import axios from 'axios';

axios.defaults.withCredentials = true;

const BASE_URL = "https://quruxorganics-core.onrender.com/api/v1/receipts"; // Assuming this is the base URL for receipts
const BASE_URL2 = "https://quruxorganics-core.onrender.com/api/v1/receipts"; // Assuming this is the base URL for receipts

const endpoints = {
    getClientReceipts: (clientId) => `${BASE_URL}/client/${clientId}`, // Client-specific receipts
    getAllReceipts: `${BASE_URL}/admin/receipts`, // Admin route for all receipts
    getnewReceipts: `${BASE_URL2}/admin/latestreceipts`, // Admin route for all receipts
    getReceiptTotal: `${BASE_URL2}/admin/total`, // Admin route for all receipts
    getSalesReport: `${BASE_URL}/admin/sales-report`, // Admin route for sales report
};

// Fetch client receipts based on clientId
const getClientReceipts = async (clientId) => {
    try {
        const response = await axios.get(endpoints.getClientReceipts(clientId));
        return response.data;
    } catch (error) {
        console.error('Error fetching client receipts:', error.response?.data || error);
        throw error;
    }
};

// Fetch all receipts for admin
const getAllReceipts = async () => {
    try {
        const response = await axios.get(endpoints.getAllReceipts);
        return response.data;
    } catch (error) {
        console.error('Error fetching all receipts:', error.response?.data || error);
        throw error;
    }
};

// Fetch all receipts for admin
const getNewReceipts = async () => {
    try {
        const response = await axios.get(endpoints.getnewReceipts);
        return response.data;
    } catch (error) {
        console.error('Error fetching all receipts:', error.response?.data || error);
        throw error;
    }
};
// Fetch all receipts for admin
const getTotalsAll = async () => {
    try {
        const response = await axios.get(endpoints.getReceiptTotal);
        return response.data;
    } catch (error) {
        console.error('Error fetching all receipts:', error.response?.data || error);
        throw error;
    }
};

// Fetch sales report for admin
const getSalesReport = async () => {
    try {
        const response = await axios.get(endpoints.getSalesReport);
        return response.data;
    } catch (error) {
        console.error('Error fetching sales report:', error.response?.data || error);
        throw error;
    }
};

// Organize all service methods into a single object
const receiptService = {
    getClientReceipts,
    getAllReceipts,
    getNewReceipts,
    getTotalsAll,
    getSalesReport,
};

export default receiptService;
