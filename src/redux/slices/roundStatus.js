import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../configs/axiosClient";

const initialState = {
    roundStatus: [],
    isLoading: false,
    isBettingStatusLoading: false,
    isDeclareResultLoading: false,
    isNextRoundLoading: false,
    isError: false,
    payoutButtonLoader: false,
    message: "",
  },
  entity = "round-status";

export const roundStatus = createAsyncThunk(`${entity}`, async (thunkAPI) => {
  try {
    const response = await getRequest("round-status");

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const childrenSlice = createSlice({
  name: entity,
  initialState,
  reducers: {
    setRound: (state, data) => {
      state.isLoading = false;
      state.roundStatus = data.payload;
    },
    setStatus: (state, data) => {
      state.isLoading = false;
      state.roundStatus = data.payload;
    },
    setPayoutButtonLoader: (state, data) => {
      state.isLoading = false;
      state.payoutButtonLoader = data.payload;
    },
    setRoundLoader: (state, data) => {
      state.isLoading = false;
      state.isDeclareResultLoading = data.payload;
    },
    setBettingLoader: (state, data) => {
      state.isLoading = false;
      state.isBettingStatusLoading = data.payload;
    },
    setNextRoundLoader: (state, data) => {
      state.isLoading = false;
      state.isNextRoundLoading = data.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // All Cash In
      .addCase(roundStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(roundStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roundStatus = action.payload;
      })
      .addCase(roundStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { setRound, setStatus, setPayoutButtonLoader, setRoundLoader, setBettingLoader, setNextRoundLoader } =
  childrenSlice.actions;
export default childrenSlice.reducer;
