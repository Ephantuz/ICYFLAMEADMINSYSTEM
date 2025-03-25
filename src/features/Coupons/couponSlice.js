import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import couponService from './couponService';


const initialState = {
    coupons: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const createCouponAsync = createAsyncThunk(
    'coupon/createCouponAsync',
    async (formData, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await couponService.newCoupon(formData);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateCouponAsync = createAsyncThunk(
    'coupon/updateCouponAsync',
    async ({ id, couponData }, thunkAPI) => {
        try {

            return await couponService.updateSingleCoupon(id, couponData);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteCouponAsync = createAsyncThunk(
    'coupon/deleteCouponAsync',
    async (id, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            await couponService.deleteCoupon(id);
            return id;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createCouponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        reset: (state) => {
            state.coupons = '';
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCouponAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCouponAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.coupons.push(action.payload);
            })
            .addCase(createCouponAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateCouponAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCouponAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.coupons.findIndex(coupon => coupon._id === action.payload._id);
                if (index !== -1) {
                    state.coupons[index] = action.payload; // Update the coupon
                }
            })
            .addCase(updateCouponAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteCouponAsync.fulfilled, (state, action) => {
                state.coupons = state.coupons.filter(coupon => coupon._id !== action.payload); // Remove coupon from the array
            })
    },
});

export const { reset } = createCouponSlice.actions;
export default createCouponSlice.reducer;