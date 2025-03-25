import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService.js';


const initialState = {
    products: [],
    total: 0,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getAllProductsAsync = createAsyncThunk(
    'products/getAllProductsAsync',
    async (shopId, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await productService.getAllProducts(shopId);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);




export const productFetchSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // reset: (state) => {
        //     state.products = [];
        //     state.isError = false;
        //     state.isSuccess = false;
        //     state.isLoading = false;
        //     state.message = '';
        // }
    },
    extraReducers: (builder) => {
        builder
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
    },
});

// export const { reset } = productFetchSlice.actions;
export default productFetchSlice.reducer;