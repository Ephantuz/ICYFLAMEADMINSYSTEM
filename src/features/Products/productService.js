import axios from 'axios';

axios.defaults.withCredentials = true;

const BASE_URL = "http://localhost:8100/api/v1/products"; // Assuming this is the base

const endpoints = {
    createProduct: `${BASE_URL}`,
    getAllProducts: (shopId) => `${BASE_URL}/shopid?shopid=${shopId}`,
    getProductById: (id) => `${BASE_URL}/find/${id}`,
    getNewProducts: `${BASE_URL}?new=true`,
    getProductsByCategory: (category) => `${BASE_URL}?category=${category}`,
    getSoldOutProducts: `${BASE_URL}?sold_out=true`, // New endpoint for sold-out products
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
        console.error('Error creating new product:', error.response?.data || error);
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

// New function to fetch all sold-out products
const getSoldOutProducts = async () => {
    try {
        const response = await axios.get(endpoints.getSoldOutProducts);
        return response.data;
    } catch (error) {
        console.error('Error fetching sold-out products:', error.response?.data || error);
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
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error.response?.data || error);
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
    getSoldOutProducts, // Added to the service
    updateSingleProduct,
    deleteProduct,
};

export default productService;
