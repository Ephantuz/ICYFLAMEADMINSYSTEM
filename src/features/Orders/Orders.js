// src/redux/ordersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// axios.defaults.withCredentials = true;



export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, thunkAPI) => {
    try {
        const response = await axios.get('https://icyflame-ltd-core.onrender.com/api/v1/finance/admin', {
            withCredentials: true // Send cookies
        });

        console.log("🔹 Response Data:", response.data);
        return response.data;
    } catch (error) {
        console.log("❌ Axios Error:", error.response?.data || error.message);
        return thunkAPI.rejectWithValue(error.response?.data || "An error occurred");
    }
});




const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        isLoading: false,
        isError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload || [];
            })
            .addCase(fetchOrders.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
        // .addCase(deleteOrder.fulfilled, (state, action) => {
        //     state.orders = state.orders.filter(order => order.id !== action.payload);
        // })
        // .addCase(deleteOrder.rejected, (state) => {
        //     state.isError = true;
        // });
    },
});

export default ordersSlice.reducer;