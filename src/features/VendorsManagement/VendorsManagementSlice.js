import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import vendorService from "./VendorsManagementService";

const initialState = {
    vendors: [],
    filteredVendors: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Async thunks
export const fetchAllVendors = createAsyncThunk(
    'vendor/fetchAll',
    async (_, thunkAPI) => {
        try {
            return await vendorService.getAllVendors();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchVendorsByStatus = createAsyncThunk(
    'vendor/fetchByStatus',
    async (status, thunkAPI) => {
        try {
            return await vendorService.getVendorsByStatus(status);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const changeVendorStatus = createAsyncThunk(
    'vendor/changeStatus',
    async ({ vendorId, status }, thunkAPI) => {
        try {
            return await vendorService.updateVendorStatus(vendorId, status);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const vendorSlice = createSlice({
    name: 'vendor',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all vendors
            .addCase(fetchAllVendors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllVendors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.vendors = action.payload.vendors || action.payload;
            })
            .addCase(fetchAllVendors.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Fetch vendors by status
            .addCase(fetchVendorsByStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchVendorsByStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.filteredVendors = action.payload.vendors || action.payload;
            })
            .addCase(fetchVendorsByStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Change vendor status
            .addCase(changeVendorStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeVendorStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                // Update the vendor in the list
                const updatedVendor = action.payload.vendor;
                state.vendors = state.vendors.map(vendor =>
                    vendor._id === updatedVendor._id ? updatedVendor : vendor
                );
                state.filteredVendors = state.filteredVendors.map(vendor =>
                    vendor._id === updatedVendor._id ? updatedVendor : vendor
                );
            })
            .addCase(changeVendorStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = vendorSlice.actions;
export default vendorSlice.reducer;