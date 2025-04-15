import axios from 'axios';

const API_URL = 'https://icyflame-ltd-core.onrender.com/api/v1/auth/order';

// Create new location
const createLocation = async (locationData) => {
    const response = await axios.post(`${API_URL}/createdeliverylocations`, locationData);
    return response.data;
};

// Get all locations
const getLocations = async () => {
    const response = await axios.get(`${API_URL}/deliverylocations`);
    return response.data;
};

// Update location
const updateLocation = async (id, locationData) => {
    const response = await axios.put(`${API_URL}/deliverylocations/${id}`, locationData);
    return response.data;
};

// Delete location
const deleteLocation = async (id) => {
    const response = await axios.delete(`${API_URL}/deliverylocations/${id}`);
    return response.data;
};

const locationService = {
    createLocation,
    getLocations,
    updateLocation,
    deleteLocation
};

export default locationService;