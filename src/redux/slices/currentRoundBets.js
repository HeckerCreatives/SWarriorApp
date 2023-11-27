import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../configs/axiosClient";

const initialState = {
    teamMeron: [],
    teamWala: [],
    totalMeron: [],
    totalWala: [],
    myCurrentBet: [],
    teamsTotalBets: [],
    betAmount: "",
    isLoading: false,
    currentRoundLoader: false,
    isError: false,
    message: "",
  },
  entity = "current-rounds";

export const teamsTotalBets = createAsyncThunk(
  `${entity}`,
  async (thunkAPI) => {
    try {
      const teamWala = await getRequest("current-rounds?_team=wala");
      const teamMeron = await getRequest("current-rounds?_team=meron");

      const response = {
        teamWala: teamWala.data,
        teamMeron: teamMeron.data,
      };

      return response;
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

export const myCurrentBet = createAsyncThunk(
  `${entity}/myCurrentBet`,
  async (data, thunkAPI) => {
    try {
      const response = await getRequest(
        `current-rounds/${data.user_id}/${data.arena_id}`
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
    setBetAmount: (state, data) => {
      state.currentRoundLoader = false;
      state.betAmount = data.payload;
    },
    setCurrentBet: (state, data) => {
      state.currentRoundLoader = false;
      state.myCurrentBet = data.payload;
    },
    setCurrentRoundLoader: (state) => {
      state.currentRoundLoader = true;
    },
    setTeams: (state, data) => {
      state.isLoading = false;
      state.totalMeron = data.payload.totalMeron;
      state.totalWala = data.payload.totalWala;
      state.teamMeron = data.payload.teamMeron ? data.payload.teamMeron : [];
      state.teamWala = data.payload.teamWala ? data.payload.teamWala : [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Current Rounds
      .addCase(teamsTotalBets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(teamsTotalBets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teamMeron = action.payload.teamMeron;
        state.teamWala = action.payload.teamWala;
      })
      .addCase(teamsTotalBets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // My Current Bets
      .addCase(myCurrentBet.pending, (state) => {
        state.currentRoundLoader = true;
      })
      .addCase(myCurrentBet.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.currentRoundLoader = false;
        state.myCurrentBet = action.payload;
      })
      .addCase(myCurrentBet.rejected, (state, action) => {
        state.currentRoundLoader = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});



export const {
  RESET,
  setTeams,
  setCurrentBet,
  setCurrentRoundLoader,
  setBetAmount,
} = childrenSlice.actions;
export default childrenSlice.reducer;
