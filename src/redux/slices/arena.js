import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, getRequest, putRequest } from "../../configs/axiosClient";

const initialState = {
    arenas: [],
    allArenas: [],
    liveArena: [],
    closeArena: [],
    findOneArena: [],
    arenaGameHistory: [],
    liveArenaPage: 1,
    liveArenaItemsPerPage: 10,
    tableLoader: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  entity = "arenas";

export const findOneArena = createAsyncThunk(
  `${entity}`,
  async (id, thunkAPI) => {
    try {
      const response = await getRequest(`arenas/${id}&_sort=createdAt:DESC`);

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

export const createArena = createAsyncThunk(
  `${entity}`,
  async (data, thunkAPI) => {
    try {
      const response = await postRequest("arenas", data);

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

export const updateArena = createAsyncThunk(
  `${entity}`,
  async (data, thunkAPI) => {
    try {
      const response = await putRequest(`arenas/${data.id}`, data);

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

export const allArenas = createAsyncThunk(
  `${entity}/allArenas`,
  async (filter, thunkAPI) => {
    try {
      const response = await getRequest(`arenas${filter || ""}`);

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

export const liveArena = createAsyncThunk(
  `${entity}/liveArena`,
  async (pagination, thunkAPI) => {
    try {
      const response = await getRequest(`arenas${pagination || ""}`);

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

export const closeArena = createAsyncThunk(
  `${entity}/closeArena`,
  async (pagination, thunkAPI) => {
    try {
      const response = await getRequest(`arenas${pagination || ""}`);

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
    setOneArena: (state, data) => {
      state.isLoading = false;
      state.findOneArena = data.payload;
    },
    setArenaGameHistory: (state, data) => {
      state.isLoading = false;
      state.arenaGameHistory = data.payload;
    },
    setLiveArenaPage: (state, data) => {
      state.isLoading = false;
      state.liveArenaPage = data.payload;
    },
    setLiveArenaItemsPerPage: (state, data) => {
      state.isLoading = false;
      state.liveArenaPage = data.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Find One Arena
      .addCase(findOneArena.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(findOneArena.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.findOneArena = action.payload;
      })
      .addCase(findOneArena.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Live Arenas
      .addCase(liveArena.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(liveArena.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.liveArena = action.payload;
      })
      .addCase(liveArena.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Closed Arenas
      .addCase(closeArena.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(closeArena.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.closeArena = action.payload;
      })
      .addCase(closeArena.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // All Arenas
      .addCase(allArenas.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(allArenas.fulfilled, (state, action) => {
        state.tableLoader = false;
        // state.allArenas = action.payload;
        state.liveArena = action.payload.liveArena;
        state.closeArena = action.payload.closeArena;
      })
      .addCase(allArenas.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {
  RESET,
  setOneArena,
  setArenaGameHistory,
  setLiveArenaPage,
  setLiveArenaItemsPerPage,
} = childrenSlice.actions;
export default childrenSlice.reducer;
