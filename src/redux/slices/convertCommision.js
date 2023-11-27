import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, getRequest } from "../../configs/axiosClient";

const initialState = {
    convertCommission: [],
    myConvertedComms: [],
    allConvertedComms: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  entity = "convertCommission";

export const convert = createAsyncThunk(`${entity}`, async (data, thunkAPI) => {
  try {
    const response = await postRequest("commission/convert", data);

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const myConvertedComms = createAsyncThunk(
  `${entity}/myConvertedComms`,
  async (user_id, thunkAPI) => {
    try {
      const response = await getRequest(
        `commission/${user_id}&_sort=createdAt:DESC`
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
 
export const allConvertedComms = createAsyncThunk(
  `${entity}/allConvertedComms`,
  async (thunkAPI) => {
    try {
      const response = await getRequest(
        `convert-commission-histories?_sort=createdAt:DESC`
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
      // myConvertedComms
      .addCase(myConvertedComms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myConvertedComms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myConvertedComms = action.payload;
      })
      .addCase(myConvertedComms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // allConvertedComms
      .addCase(allConvertedComms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allConvertedComms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allConvertedComms = action.payload;
      })
      .addCase(allConvertedComms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET } = childrenSlice.actions;
export default childrenSlice.reducer;
