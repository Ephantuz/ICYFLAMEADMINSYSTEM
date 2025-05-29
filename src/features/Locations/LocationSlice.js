import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import locationService from './locationService.js';

const initialState = {
  locations: [],
  isLoading: false,
  isError: false,
  message: '',
  currentLocation: null
};

// Create new location
export const createLocation = createAsyncThunk(
  'locations/create',
  async (locationData, thunkAPI) => {
    try {
      return await locationService.createLocation(locationData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all locations
export const getLocations = createAsyncThunk(
  'locations/getAll',
  async (_, thunkAPI) => {
    try {
      return await locationService.getLocations();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update location
export const updateLocation = createAsyncThunk(
  'locations/update',
  async ({ id, locationData }, thunkAPI) => {
    try {
      return await locationService.updateLocation(id, locationData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete location
export const deleteLocation = createAsyncThunk(
  'locations/delete',
  async (id, thunkAPI) => {
    try {
      await locationService.deleteLocation(id);
      return id;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    reset: (state) => initialState,
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.locations.push(action.payload);
        state.message = 'Location created successfully';
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get All
      .addCase(getLocations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.locations = action.payload;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update
      .addCase(updateLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.locations = state.locations.map((location) =>
          location._id === action.payload._id ? action.payload : location
        );
        state.message = 'Location updated successfully';
        state.currentLocation = null;
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete
      .addCase(deleteLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.locations = state.locations.filter(
          (location) => location._id !== action.payload
        );
        state.message = 'Location deleted successfully';
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset, setCurrentLocation } = locationSlice.actions;
export default locationSlice.reducer;