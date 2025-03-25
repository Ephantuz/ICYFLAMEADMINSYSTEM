import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService.js';


const initialState = {
    searches: [],
    products: [],
    product: null,
    newProducts: [],
    highRates: [],
    bestDeals: [],
    bestSelling: [],
    newMerch: [],
    trending: [],
    highetReviewsRate: [],
    categoriesData: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const searchTermAsyc = createAsyncThunk(
    'products/searchTermAsyc',
    async (decodedName, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await productService.searchTerm(decodedName);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const getAllProductsAsync = createAsyncThunk(
    'products/getAllProductsAsync',
    async (_, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await productService.getAllProducts();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const getProductAsync = createAsyncThunk(
    'products/getProductAsync',
    async (id, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await productService.getProductById(id);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const getHighestRateProductsAsync = createAsyncThunk(
    'products/getHighestRateProductsAsync',
    async (thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await productService.getHighestRateProducts();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const bestDealsSlice = createAsyncThunk(
    'products/bestDealsSlice',
    async (thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await productService.bestDeals();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const bestSellingSlice = createAsyncThunk(
    'products/bestSellingSlice',
    async (thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await productService.bestSelling();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const justIn = createAsyncThunk(
    'products/justIn',
    async (thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await productService.getNewProducts();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const trendy = createAsyncThunk(
    'products/trendy',
    async (thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await productService.trends();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const highetReviews = createAsyncThunk(
    'products/highetReviews',
    async (thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await productService.reviews();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const categoryFetch = createAsyncThunk(
    'products/categoryFetch',
    async (categories, thunkAPI) => {
        try {
            // Directly use the getProductsByCategory function which handles both single and multiple categories
            const response = await productService.getProductsByCategory(categories);
            return response; // Assuming the API returns the data directly
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
        resetProduct: (state) => {
            state.product = null;  // Reset product to initial state (null)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchTermAsyc.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchTermAsyc.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.searches = action.payload;
            })
            .addCase(searchTermAsyc.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllProductsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProductsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
                // state.total = action.payload.totalProducts;
            })
            .addCase(getAllProductsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getHighestRateProductsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHighestRateProductsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.highRates = action.payload;
            })
            .addCase(getHighestRateProductsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(bestDealsSlice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(bestDealsSlice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bestDeals = action.payload;
            })
            .addCase(bestDealsSlice.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(bestSellingSlice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(bestSellingSlice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bestSelling = action.payload;
            })
            .addCase(bestSellingSlice.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(justIn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(justIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.newMerch = action.payload;
            })
            .addCase(justIn.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(trendy.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(trendy.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trending = action.payload;
            })
            .addCase(trendy.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(highetReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(highetReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.highetReviewsRate = action.payload;
            })
            .addCase(highetReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getProductAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload;
            })
            .addCase(getProductAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(categoryFetch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(categoryFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categoriesData = action.payload;
            })
            .addCase(categoryFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const { resetProduct } = productFetchSlice.actions;
export default productFetchSlice.reducer;