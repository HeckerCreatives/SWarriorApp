import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../configs/axiosClient";

const initialState = {
    cashoutRequest: [],
    myCashoutRequest: [],
    allCashoutRequest: [],
    cashoutLogs: [],
    cashoutProcessLoader: false,
    isLoading: false,
    isError: false,
    reset: false,
    message: "",
  },
  entity = "cashout";

export const cashoutRequest = createAsyncThunk(
  `${entity}/cashoutRequest`,
  async (data, thunkAPI) => {
    try {
      const response = await postRequest(
        "/cashout-requests/requestCashout",
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

export const cashoutRequestCount = createAsyncThunk(
  `${entity}/cashoutRequestCount`,
  async (data, thunkAPI) => {
    try {
      const response = await getRequest(
        "/cashout-requests/count?status=Pending",
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

export const cashoutProcessRequest = createAsyncThunk(
  `${entity}/cashoutProcessRequest`,
  async (data, thunkAPI) => {
    try {
      const response = await postRequest(
        `/cashout-requests/processRequest`,
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

export const myCashoutRequest = createAsyncThunk(
  `${entity}/myCashoutRequest`,
  async (pagination, thunkAPI) => {
    try {
      const response = await getRequest(
        `/cashout-requests${pagination}&_sort=createdAt:DESC`
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

export const allCashoutRequest = createAsyncThunk(
  `${entity}/allCashoutRequest`,
  async (filter, thunkAPI) => {
    try {
      const response = await getRequest(
        `/cashout-requests${filter}&_sort=createdAt:DESC`
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

export const cashoutLogs = createAsyncThunk(
  `${entity}/cashoutLogs`,
  async (pagination, thunkAPI) => {
    try {
      const response = await getRequest(`/cashout-logs${pagination || ""}`);

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
    resetData: (state) => {
      state.reset = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Cashout Logs
      .addCase(cashoutLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cashoutLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cashoutLogs = action.payload;
      })
      .addCase(cashoutLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Cashout Request
      .addCase(cashoutRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cashoutRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cashoutRequest = action.payload;
      })
      .addCase(cashoutRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Cashout Request Count
      .addCase(cashoutRequestCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cashoutRequestCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cashoutRequestCount = action.payload;
      })
      .addCase(cashoutRequestCount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Cashout Status Update
      .addCase(cashoutProcessRequest.pending, (state) => {
        state.cashoutProcessLoader = true;
      })
      .addCase(cashoutProcessRequest.fulfilled, (state, action) => {
        state.cashoutProcessLoader = false;
        state.cashoutProcessRequest = action.payload;
      })
      .addCase(cashoutProcessRequest.rejected, (state, action) => {
        state.cashoutProcessLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // My Cashout Request
      .addCase(myCashoutRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myCashoutRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myCashoutRequest = action.payload;
      })
      .addCase(myCashoutRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // All Cashout Request
      .addCase(allCashoutRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allCashoutRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allCashoutRequest = action.payload;
      })
      .addCase(allCashoutRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET, resetData } = childrenSlice.actions;
export default childrenSlice.reducer;
