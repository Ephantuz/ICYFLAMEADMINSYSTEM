import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import receiptService from './receiptService.js';

const initialState = {
    receipts: [],
    total: [],
    newreceipts: [],
    salesData: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Get client receipts
export const getClientReceiptsAsync = createAsyncThunk(
    'receipts/getClientReceiptsAsync',
    async (clientId, thunkAPI) => {
        try {
            return await receiptService.getClientReceipts(clientId);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
// Get client receipts
export const getNewReceiptsAsync = createAsyncThunk(
    'receipts/getNewReceiptsAsync',
    async (_, thunkAPI) => {
        try {
            return await receiptService.getNewReceipts();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
// Get client receipts
export const getTotals = createAsyncThunk(
    'receipts/getTotals',
    async (_, thunkAPI) => {
        try {
            return await receiptService.getTotalsAll();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get all receipts for admin
export const getAllReceiptsAsync = createAsyncThunk(
    'receipts/getAllReceiptsAsync',
    async (_, thunkAPI) => {
        try {
            return await receiptService.getAllReceipts();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get sales report
export const getSalesReportAsync = createAsyncThunk(
    'receipts/getSalesReportAsync',
    async (_, thunkAPI) => {
        try {
            return await receiptService.getSalesReport();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const receiptFetchSlice = createSlice({
    name: 'receipts',
    initialState,
    reducers: {
        reset: (state) => {
            state.receipts = [];
            state.newreceipts = [];
            state.total = [];
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClientReceiptsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getClientReceiptsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.receipts = action.payload.receipts;
            })
            .addCase(getClientReceiptsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllReceiptsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllReceiptsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.receipts = action.payload.receipts;
            })
            .addCase(getAllReceiptsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getNewReceiptsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNewReceiptsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.newreceipts = action.payload.latestReceipts;
            })
            .addCase(getNewReceiptsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTotals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTotals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.total = action.payload;
            })
            .addCase(getTotals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getSalesReportAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSalesReportAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.salesData = action.payload.salesData;
            })
            .addCase(getSalesReportAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

// export const { reset } = receiptFetchSlice.actions;
export default receiptFetchSlice.reducer;
