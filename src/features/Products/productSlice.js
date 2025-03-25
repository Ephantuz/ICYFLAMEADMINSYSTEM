import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService.js';


const initialState = {
    product: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const createProductAsync = createAsyncThunk(
    'product/createProductAsync',
    async (productData, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await productService.newProduct(productData);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateProductAsync = createAsyncThunk(
    'product/updateProductAsync',
    async ({ id, productData }, thunkAPI) => {
        try {

            return await productService.updateSingleProduct(id, productData);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteProductAsync = createAsyncThunk(
    'product/deleteProductAsync',
    async (id, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            await productService.deleteProduct(id);
            return id;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const productUploadSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => {
            state.product = [];
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProductAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProductAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(createProductAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateProductAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(deleteProductAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = state.product.filter((product) => product._id !== action.payload); // Remove the product with the deleted id
            })
            .addCase(deleteProductAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload; // Set error message
            });
    },
});

export const { reset } = productUploadSlice.actions;
export default productUploadSlice.reducer;