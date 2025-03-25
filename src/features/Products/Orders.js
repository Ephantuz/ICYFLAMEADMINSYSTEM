import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService.js';

const initialState = {
    orders: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Fetch all orders based on shop ID
export const getAllOrdersByShopAsync = createAsyncThunk(
    'orders/getAllOrdersByShopAsync',
    async (shopId, thunkAPI) => {
        try {
            return await orderService.getAllOrdersByShop(shopId);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update an order's status
export const updateOrderStatusAsync = createAsyncThunk(
    'orders/updateOrderStatusAsync',
    async ({ orderId, status }, thunkAPI) => {
        try {
            return await orderService.updateOrderStatus(orderId, status);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        reset: (state) => {
            state.orders = [];
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrdersByShopAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrdersByShopAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(getAllOrdersByShopAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateOrderStatusAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Update the order status in the orders array
                const updatedOrder = action.payload;
                state.orders = state.orders.map(order =>
                    order._id === updatedOrder._id ? updatedOrder : order
                );
            })
            .addCase(updateOrderStatusAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
