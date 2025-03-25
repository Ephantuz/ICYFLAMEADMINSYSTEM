import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import eventService from './eventService';


const initialState = {
    Events: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getAllEventsAsync = createAsyncThunk(
    'Events/getAllEventsAsync',
    async (shopId, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await eventService.getAllProducts(shopId);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);





export const EventFetchSlice = createSlice({
    name: 'Events',
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
            .addCase(getAllEventsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllEventsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.Events =(action.payload);
            })
            .addCase(getAllEventsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

// export const { reset } = productFetchSlice.actions;
export default EventFetchSlice.reducer;