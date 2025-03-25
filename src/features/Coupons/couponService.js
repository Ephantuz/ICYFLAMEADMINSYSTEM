import axios from 'axios';

axios.defaults.withCredentials = true;

const BASE_URL = "https://multivendorecommerce.onrender.com/api/v1/coupons"; // Assuming this is the base

const endpoints = {
    createProduct: `${BASE_URL}`,
    getAllProducts: (shopId) => `${BASE_URL}/shopid?shopId=${shopId}`, // Updated for query parameters
    getProductById: (id) => `${BASE_URL}/find/${id}`, // Using path parameter here
    getNewProducts: `${BASE_URL}?new=true`,
    getProductsByCategory: (category) => `${BASE_URL}?category=${category}`, // Using query parameters
    updateProduct: (id) => `${BASE_URL}/${id}`,
};


// Utilize try/catch for async operations
const newCoupon = async (formData) => {
    try {
        const response = await axios.post(endpoints.createProduct, formData);
        return response.data;
    } catch (error) {
        console.error('Error creating coupon', error.response?.data || error);
        throw error;
    }
};
const getAllCoupons = async (shopId) => {
    try {
        const response = await axios.get(endpoints.getAllProducts(shopId));
        return response.data;
    } catch (error) {
        console.error('Error fetching all coupons:', error.response?.data || error);
        throw error;
    }
};


const getCouponById = async (id) => {
    try {
        const response = await axios.get(endpoints.getProductById(id));
        return response.data;
    } catch (error) {
        console.error('Error fetching coupon by ID:', error.response?.data || error);
        throw error;
    }
};

const getNewCoupons = async () => {
    try {
        const response = await axios.get(endpoints.getNewProducts);
        return response.data;
    } catch (error) {
        console.error('Error fetching new coupons:', error.response?.data || error);
        throw error;
    }
};

const getCouponsByCategory = async (category) => {
    try {
        const response = await axios.get(endpoints.getProductsByCategory(category));
        return response.data;
    } catch (error) {
        console.error('Error fetching coupons by category:', error.response?.data || error);
        throw error;
    }
};

export const updateSingleCoupon = async (id, couponData) => {
    try {
        const response = await axios.put(endpoints.updateProduct(id), couponData);
        return response.data;
    } catch (error) {
        console.error('Error updating coupon:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteCoupon = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`)
        return response.data;
    } catch (error) {
        console.error('Error deleting coupon:', error.response?.data || error);
        throw error;
    }
};


// Organize all service methods into a single object
const couponService = {
    newCoupon,
    getAllCoupons,
    getCouponById,
    getNewCoupons,
    getCouponsByCategory,
    updateSingleCoupon,
    deleteCoupon,
};

export default couponService;
