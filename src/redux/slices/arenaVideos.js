import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from "../../configs/axiosClient";

const initialState = {
    arenas: [],
    allArenaVideos: [],
    allArenaVideosCount: [],
    tableLoader: false,
    currentPage: 1,
    itemsPerPage: 5,
    isLoading: false,
    isError: false,
    message: "",
  },
  entity = "arenaVideos";

export const createArenaVideo = createAsyncThunk(
  `${entity}`,
  async (data, thunkAPI) => {
    try {
      const response = await postRequest("arena-videos", data);

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

export const updateArenaVideo = createAsyncThunk(
  `${entity}`,
  async (data, thunkAPI) => {
    try {
      const response = await putRequest(`arena-videos/${data.id}`, data);

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

export const deleteArenaVideo = createAsyncThunk(
  `${entity}`,
  async (data, thunkAPI) => {
    try {
      const response = await deleteRequest(`arena-videos/${data.id}`);

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

export const allArenaVideos = createAsyncThunk(
  `${entity}/allArenaVideos`,
  async (pagination, thunkAPI) => {
    try {
      const response = await getRequest(`arena-videos/${pagination || ""}`);

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

export const allArenaVideosCount = createAsyncThunk(
  `${entity}/allArenaVideosCount`,
  async (pagination, thunkAPI) => {
    try {
      const response = await getRequest(
        `arena-videos/count${pagination || ""}`
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // All Arenas
      .addCase(allArenaVideos.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(allArenaVideos.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.allArenaVideos = action.payload;
      })
      .addCase(allArenaVideos.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // All Arenas Videos Count
      .addCase(allArenaVideosCount.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(allArenaVideosCount.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.allArenaVideosCount = action.payload;
      })
      .addCase(allArenaVideosCount.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET, setCurrentPage } = childrenSlice.actions;
export default childrenSlice.reducer;
