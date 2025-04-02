import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

// Async thunk to fetch admin payment data
export const fetchAdminPayments = createAsyncThunk(
    "adminPayments/fetchAdminPayments",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://icyflame-ltd-core.onrender.com/api/v1/orders/admin/payment', {
                withCredentials: true, // Ensure cookies are sent
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch payments");
        }
    }
);


const adminPaymentSlice = createSlice({
    name: "adminPayments",
    initialState: {
        shopEarnings: {},
        totalTaxEarnings: 0,
        totalDeliveryEarnings: 0,
        totalClientTaxEarnings: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.shopEarnings = action.payload.shopEarnings;
                state.totalTaxEarnings = action.payload.totalTaxEarnings;
                state.totalDeliveryEarnings = action.payload.totalDeliveryEarnings;
                state.totalClientTaxEarnings = action.payload.totalClientTaxEarnings;
            })
            .addCase(fetchAdminPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default adminPaymentSlice.reducer;
