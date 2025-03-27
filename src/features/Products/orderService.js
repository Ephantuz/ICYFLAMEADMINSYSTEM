// import axios from 'axios';

// axios.defaults.withCredentials = true;

// const BASE_URL = "https://quruxorganics-core.onrender.com/api/v1/orders"; // Base URL for order endpoints

// const endpoints = {
//     getAllOrdersByShop: (shopId) => `${BASE_URL}/shop?shopId=${shopId}`, // Updated for query parameter `shopid`
//     updateOrderStatus: (orderId) => `${BASE_URL}/shop/${orderId}`, // Endpoint for updating order status by order ID
// };

// // Fetch all orders by shop ID
// const getAllOrdersByShop = async (shopId) => {
//     try {
//         const response = await axios.get(endpoints.getAllOrdersByShop(shopId));
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching orders by shop ID:', error.response?.data || error);
//         throw error;
//     }
// };

// // Update the status of an order
// const updateOrderStatus = async (orderId, status) => {
//     try {
//         const response = await axios.put(endpoints.updateOrderStatus(orderId), { status });
//         return response.data;
//     } catch (error) {
//         console.error('Error updating order status:', error.response?.data || error);
//         throw error;
//     }
// };

// // Organize all service methods into a single object
// const orderService = {
//     getAllOrdersByShop,
//     updateOrderStatus,
// };

// export default orderService;
