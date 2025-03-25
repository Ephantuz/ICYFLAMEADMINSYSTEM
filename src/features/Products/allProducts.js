import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService.js';

const initialState = {
    products: [],
    soldOutProducts: [], // New state for sold-out products
    total: 0,
    totalSales: 0,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Async thunk for fetching all products
export const getAllProductsAsync = createAsyncThunk(
    'products/getAllProductsAsync',
    async (shopId, thunkAPI) => {
        try {
            return await productService.getAllProducts(shopId);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Async thunk for fetching sold-out products
export const getSoldOutProductsAsync = createAsyncThunk(
    'products/getSoldOutProductsAsync',
    async (_, thunkAPI) => {
        try {
            return await productService.getSoldOutProducts();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const productFetchSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetching all products
            .addCase(getAllProductsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProductsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload.products;
                state.total = action.payload.totalProducts;
            })
            .addCase(getAllProductsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Fetching sold-out products
            .addCase(getSoldOutProductsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSoldOutProductsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.soldOutProducts = action.payload; // Ensure this is an array
                state.totalSales = action.payload.length; // Add this line
            })
            .addCase(getSoldOutProductsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export default productFetchSlice.reducer;
