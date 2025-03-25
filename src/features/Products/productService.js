import axios from 'axios';

axios.defaults.withCredentials = true;

const BASE_URL = "https://quruxorganics-core.onrender.com/api/v1/products"; // Assuming this is the base

const endpoints = {
    createProduct: `${BASE_URL}`,
    getAllProducts: (shopId) => `${BASE_URL}/shopid?shopid=${shopId}`, // Updated for query parameters
    getProductById: (id) => `${BASE_URL}/find/${id}`, // Using path parameter here
    getNewProducts: `${BASE_URL}?new=true`,
    getProductsByCategory: (category) => `${BASE_URL}?category=${category}`, // Using query parameters
    updateProduct: (id) => `${BASE_URL}/${id}`,
};


// Utilize try/catch for async operations
const newProduct = async (productData) => {
    try {
        const response = await axios.post(endpoints.createProduct, productData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all products:', error.response?.data || error);
        throw error;
    }
};
const getAllProducts = async (shopId) => {
    try {
        const response = await axios.get(endpoints.getAllProducts(shopId));
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

const getProductsByCategory = async (category) => {
    try {
        const response = await axios.get(endpoints.getProductsByCategory(category));
        return response.data;
    } catch (error) {
        console.error('Error fetching products by category:', error.response?.data || error);
        throw error;
    }
};

export const updateSingleProduct = async (id, productData) => {
    try {
        const response = await axios.put(endpoints.updateProduct(id), productData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`)
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error.response?.data || error);
        throw error;
    }
};


// Organize all service methods into a single object
const productService = {
    newProduct,
    getAllProducts,
    getProductById,
    getNewProducts,
    getProductsByCategory,
    updateSingleProduct,
    deleteProduct,
};

export default productService;
