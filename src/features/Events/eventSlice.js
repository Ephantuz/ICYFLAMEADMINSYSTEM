import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import eventService from './eventService';


const initialState = {
    event: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const createProductAsync = createAsyncThunk(
    'event/createProductAsync',
    async (productData, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await eventService.newProduct(productData);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateProductAsync = createAsyncThunk(
    'event/updateProductAsync',
    async ({ id, productData }, thunkAPI) => {
        try {

            return await eventService.updateSingleProduct(id, productData);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteProductAsync = createAsyncThunk(
    'event/deleteProductAsync',
    async (id, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            await eventService.deleteProduct(id);
            return id;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createEventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        reset: (state) => {
            state.event = [];
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
                state.event.push(action.payload);
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
                state.event.push(action.payload);
            })
            .addCase(updateProductAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.event = state.event.filter(event => event._id !== action.payload);
            })
    },
});

export const { reset } = createEventSlice.actions;
export default createEventSlice.reducer;