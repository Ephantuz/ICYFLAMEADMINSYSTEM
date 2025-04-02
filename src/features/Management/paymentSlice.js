import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const processVendorPayment = createAsyncThunk(
    'payments/processVendorPayment',
    async (paymentData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('https://icyflame-ltd-core.onrender.com/api/v1/finance/payments/process', paymentData, {
                withCredentials: true,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getVendorPaymentSummary = createAsyncThunk(
    'payments/getVendorPaymentSummary',
    async (shopId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`https://icyflame-ltd-core.onrender.com/api/v1/vendor/${shopId}`, {
                withCredentials: true,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAdminPaymentDashboard = createAsyncThunk(
    'payments/getAdminPaymentDashboard',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('https://icyflame-ltd-core.onrender.com/api/v1/admin/payment-dashboard', {
                withCredentials: true,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getOrderPayments = createAsyncThunk(
    'payments/getOrderPayments',
    async (orderId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`https://icyflame-ltd-core.onrender.com/api/v1/finance/payments/order/${orderId}`, {
                withCredentials: true,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Initial State
const initialState = {
    paymentDashboard: null,
    vendorSummary: null,
    orderPayments: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

// Slice
const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        resetPaymentState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
        clearPaymentData: (state) => {
            state.paymentDashboard = null;
            state.vendorSummary = null;
            state.orderPayments = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Process Vendor Payment
            .addCase(processVendorPayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(processVendorPayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                // Update relevant payment records if needed
            })
            .addCase(processVendorPayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || 'Payment processing failed';
            })

            // Get Vendor Payment Summary
            .addCase(getVendorPaymentSummary.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getVendorPaymentSummary.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.vendorSummary = action.payload;
            })
            .addCase(getVendorPaymentSummary.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || 'Failed to fetch vendor summary';
            })

            // Get Admin Payment Dashboard
            .addCase(getAdminPaymentDashboard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAdminPaymentDashboard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.paymentDashboard = action.payload;
            })
            .addCase(getAdminPaymentDashboard.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || 'Failed to fetch payment dashboard';
            })

            // Get Order Payments
            .addCase(getOrderPayments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderPayments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderPayments = action.payload;
            })
            .addCase(getOrderPayments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || 'Failed to fetch order payments';
            });
    },
});

export const { resetPaymentState, clearPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;