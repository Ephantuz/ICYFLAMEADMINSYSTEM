import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import couponService from './couponService';


const initialState = {
    coupons: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getAllCouponsAsync = createAsyncThunk(
    'coupons/getAllCouponsAsync',
    async (shopId, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await couponService.getAllCoupons(shopId);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);





export const EventFetchSlice = createSlice({
    name: 'coupons',
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
            .addCase(getAllCouponsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCouponsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.coupons = (action.payload);
            })
            .addCase(getAllCouponsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

// export const { reset } = productFetchSlice.actions;
export default EventFetchSlice.reducer;