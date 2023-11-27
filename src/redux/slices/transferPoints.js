import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, getRequest } from "../../configs/axiosClient";

const initialState = {
    transferUserPoints: [],
    superadminTransferPoints: [],
    userTransferHistory: [],
    allHistory: [],
    transferLogs: [],
    myHistory: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  entity = "transferPoints";

export const transferUserPoints = createAsyncThunk(
  `${entity}`,
  async (data, thunkAPI) => {
    try {
      const response = await postRequest(
        "transfer-points-histories/transferUser",
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

export const superadminTransferPoints = createAsyncThunk(
  `${entity}/superadminTransferPoints`,
  async (data, thunkAPI) => {
    try {
      const response = await postRequest(
        "transfer-points-histories/superadminTransfer",
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
 
export const transferLogs = createAsyncThunk(
  `${entity}/transferLogs`,
  async (pagination, thunkAPI) => {
    try {
      const response = await getRequest(
        `transfer-points-histories${pagination || ""}&_sort=createdAt:DESC`
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

export const allHistory = createAsyncThunk(
  `${entity}/allHistory`,
  async (filter, thunkAPI) => {
    try {
      const response = await getRequest(
        `transfer-points-histories${filter || ""}&_sort=createdAt:DESC`
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

export const myHistory = createAsyncThunk(
  `${entity}/myHistory`,
  async (sender_id, thunkAPI) => {
    try {
      const response = await getRequest(
        `transfer-points-histories/myHistory/${sender_id}?_sort=createdAt:DESC`
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

export const userTransferHistory = createAsyncThunk(
  `${entity}/userTransferHistory`,
  async (pagination, thunkAPI) => {
    try {
      const response = await getRequest(
        `transfer-points-histories${pagination || ""}&_sort=createdAt:DESC`
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
      // userTransferHistory
      .addCase(userTransferHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userTransferHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userTransferHistory = action.payload;
      })
      .addCase(userTransferHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // transferUserPoints
      .addCase(transferUserPoints.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(transferUserPoints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transferUserPoints = action.payload;
      })
      .addCase(transferUserPoints.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Superadmin Transfer points
      .addCase(superadminTransferPoints.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(superadminTransferPoints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.superadminTransferPoints = action.payload;
      })
      .addCase(superadminTransferPoints.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // My History
      .addCase(myHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myHistory = action.payload;
      })
      .addCase(myHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // All History
      .addCase(allHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allHistory = action.payload;
      })
      .addCase(allHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Transfer Logs
      .addCase(transferLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(transferLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transferLogs = action.payload;
      })
      .addCase(transferLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET } = childrenSlice.actions;
export default childrenSlice.reducer;
