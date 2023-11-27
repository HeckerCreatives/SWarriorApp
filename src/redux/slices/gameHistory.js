import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../configs/axiosClient";

const initialState = {
    currentRoundOutcome: [],
    arenaLogs: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  entity = "/game-histories";

export const getCurrentRoundOutcome = createAsyncThunk(
  `${entity}`,
  async (filters, thunkAPI) => {
    try {
      const response = await getRequest(`/game-histories${filters}`);
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

export const getArenaLogs = createAsyncThunk(
  `${entity}/arenaLogs`,
  async (filters, thunkAPI) => {
    try {
      const response = await getRequest(`/game-histories${filters}`);

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
    setCurrentOutcome: (state, data) => {
      state.isLoading = false;
      state.currentRoundOutcome = data.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Arena Logs
      .addCase(getArenaLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArenaLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.arenaLogs = action.payload;
      })
      .addCase(getArenaLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Current Round Outcome
      .addCase(getCurrentRoundOutcome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentRoundOutcome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRoundOutcome = action.payload[0];
      })
      .addCase(getCurrentRoundOutcome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { setCurrentOutcome } = childrenSlice.actions;
export default childrenSlice.reducer;
