import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, getRequest } from "../../configs/axiosClient";

const initialState = {
    cashin: [],
    allCashIn: [],
    tableLoader: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  entity = "cashin";

export const allCashIn = createAsyncThunk(`${entity}`, async (thunkAPI) => {
  try {
    const response = await getRequest("cashins?_sort=createdAt:DESC");

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const cashin = createAsyncThunk(`${entity}`, async (data, thunkAPI) => {
  try {
    const response = await postRequest("users-permissions/user/cashin", data);

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
    RESET: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // All Cash In
      .addCase(allCashIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allCashIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allCashIn = action.payload;
      })
      .addCase(allCashIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET } = childrenSlice.actions;
export default childrenSlice.reducer;
