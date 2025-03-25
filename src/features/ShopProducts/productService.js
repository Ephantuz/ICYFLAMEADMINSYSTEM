import axios from 'axios';

axios.defaults.withCredentials = true;

const BASE_URL = "https://quruxorganics-core.onrender.com/api/v1/products"; // Assuming this is the base

const endpoints = {
    getAllProducts: `${BASE_URL}`,
    getProductById: (id) => `${BASE_URL}/find/${id}`,
    getNewProducts: `${BASE_URL}?new=true`,
    bestDeals: `${BASE_URL}?bestDeals=true`,
    bestSelling: `${BASE_URL}?highestSales=true`,
    trends: `${BASE_URL}?trends=true`,
    searchTerm: (decodedName) => `${BASE_URL}?name=${decodedName}`,
    getHighetRateProducts: `${BASE_URL}?highestRatings=true`,
    reviews: `${BASE_URL}?reviews=true`,
    getProductsByCategory: (categories) => {
        if (Array.isArray(categories)) {
            // Join the array into a comma-separated string
            return `${BASE_URL}?category=${categories.join(',')}`;
        } else {
            // Handle a single category as a string
            return `${BASE_URL}?category=${categories}`;
        }
    },
    updateProduct: (id) => `${BASE_URL}/${id}`,
};


const getAllProducts = async () => {
    try {
        const response = await axios.get(endpoints.getAllProducts);  // Adjusted to use directly as string
        return response.data;
    } catch (error) {
        console.error('Error fetching all products:', error.response?.data || error);
        throw error;
    }
};


const getProductById = async (id) => {
    try {
        const response = await axios.get(endpoints.getProductById(id));
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error.response?.data || error);
        throw error;
    }
};

const getNewProducts = async () => {
    try {
        const response = await axios.get(endpoints.getNewProducts);
        return response.data;
    } catch (error) {
        console.error('Error fetching new products:', error.response?.data || error);
        throw error;
    }
};
const getHighestRateProducts = async () => {
    try {
        const response = await axios.get(endpoints.getHighetRateProducts);
        return response.data;
    } catch (error) {
        console.error('Error fetching new products:', error.response?.data || error);
        throw error;
    }
};
const bestDeals = async () => {
    try {
        const response = await axios.get(endpoints.bestDeals);
        return response.data;
    } catch (error) {
        console.error('Error fetching new products:', error.response?.data || error);
        throw error;
    }
};
const bestSelling = async () => {
    try {
        const response = await axios.get(endpoints.bestSelling);
        return response.data;
    } catch (error) {
        console.error('Error fetching new products:', error.response?.data || error);
        throw error;
    }
};
const trends = async () => {
    try {
        const response = await axios.get(endpoints.trends);
        return response.data;
    } catch (error) {
        console.error('Error fetching new products:', error.response?.data || error);
        throw error;
    }
};
const reviews = async () => {
    try {
        const response = await axios.get(endpoints.reviews);
        return response.data;
    } catch (error) {
        console.error('Error fetching new products:', error.response?.data || error);
        throw error;
    }
};

const getProductsByCategory = async (category) => {
    try {
        const response = await axios.get(endpoints.getProductsByCategory(category));
        return response.data;
    } catch (error) {
        console.error('Error fetching products by category:', error.response?.data || error);
        throw error;
    }
};
const searchTerm = async (decodedName) => {
    try {
        const response = await axios.get(endpoints.searchTerm(decodedName));
        return response.data;
    } catch (error) {
        console.error('Error fetching products by category:', error.response?.data || error);
        throw error;
    }
};



// Organize all service methods into a single object
const productService = {
    getAllProducts,
    bestDeals,
    bestSelling,
    getProductById,
    getNewProducts,
    trends,
    reviews,
    getHighestRateProducts,
    getProductsByCategory,
    searchTerm,
};

export default productService;
