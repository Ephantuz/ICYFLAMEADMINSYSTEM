// src/redux/ordersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;


// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8100/api/v1/orders/admin', {
                withCredentials: true, // Ensure cookies are sent
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch orders');
        }
    }
);


// // Async thunk to delete an order
// export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId, { rejectWithValue }) => {
//     try {
//         await axios.delete(`/api/orders/${orderId}`);
//         return orderId;
//     } catch (error) {
//         return rejectWithValue(error.response?.data || 'Failed to delete order');
//     }
// });

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