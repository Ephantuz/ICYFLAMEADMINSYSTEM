// features/paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initializePayment = createAsyncThunk('payment/initializePayment', async (paymentData, thunkAPI) => {
    try {
        const response = await axios.post('https://quruxorganics-core.onrender.com/api/v1/auth/paystack/initialize', paymentData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const verifyPayment = createAsyncThunk('payment/verifyPayment', async (reference, thunkAPI) => {
    try {
        const response = await axios.get(`https://quruxorganics-core.onrender.com/api/v1/auth/paystack/verify/${reference}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        paymentUrl: '',
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializePayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(initializePayment.fulfilled, (state, action) => {
                console.log('Paystack Response:', action.payload); // Log to verify
                state.isLoading = false;
                state.isSuccess = true;
                state.paymentUrl = action.payload.data.data.authorization_url;
            })
            .addCase(initializePayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(verifyPayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyPayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = 'Payment Verified Successfully';
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export default paymentSlice.reducer;
