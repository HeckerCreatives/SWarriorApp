import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, getRequest } from "../../configs/axiosClient";

const initialState = {
    commissionRequests: [],
    commissionLogs: [],
    myCommissionRequests: [],
    tableLoader: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  entity = "commission-requests";

export const myCommissionRequests = createAsyncThunk(
  `${entity}/myCommissionRequests`,
  async (pagination, thunkAPI) => {
    try {
      const response = await getRequest(`commission-requests${pagination}`);

      return response.data;
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

export const requestCommission = createAsyncThunk(
  `${entity}/requestCommission`,
  async (data, thunkAPI) => {
    try {
      const response = await postRequest(
        "commission-requests/commissionRequest",
        data
      );

      return response.data;
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

export const commissionRequests = createAsyncThunk(
  `${entity}/commissionRequest`,
  async (pagination, thunkAPI) => {
    try {
      const response = await getRequest(`commission-requests${pagination}`);

      return response.data;
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

export const processCommissionRequest = createAsyncThunk(
  `${entity}/processCommissionRequest`,
  async (data, thunkAPI) => {
    try {
      const response = await postRequest(
        `commission-requests/processRequest`,
        data
      );

      return response.data;
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

export const commissionLogs = createAsyncThunk(
  `${entity}/commissionLogs`,
  async (pagination, thunkAPI) => {
    try {
      const response = await getRequest(
        `commission-logs${pagination || ""}&_sort=createdAt:DESC`
      );

      return response.data;
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

export const childrenSlice = createSlice({
  name: entity,
  initialState,
  reducers: {
    RESET: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // MY COMMISSION REQUEST
      .addCase(myCommissionRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myCommissionRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myCommissionRequests = action.payload;
      })
      .addCase(myCommissionRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // All COMMISSION LOGS
      .addCase(commissionLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(commissionLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.commissionLogs = action.payload;
      })
      .addCase(commissionLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // All COMMISSION REQUESTS
      .addCase(commissionRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(commissionRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.commissionRequests = action.payload;
      })
      .addCase(commissionRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET } = childrenSlice.actions;
export default childrenSlice.reducer;
