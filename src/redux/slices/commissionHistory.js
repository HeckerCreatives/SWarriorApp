import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient, getRequest } from "../../configs/axiosClient";

const initialState = {
    arenaCommission: [],
    commissionStatistics: [],
    drawCommsToday: [],
    regularCommsToday: [],
    agentCommsToday: [],
    commissionHistory: [],
    companyCommission: [],
    regularCommission: [],
    grossCommision: [],
    agentCommission: [],
    drawCommission: [],
    statisticsIsLoading: false,
    isLoading: false,
    isError: false,
    message: "",
    loading: {
      overAllCompanyCommissions: false,
    },
  },
  entity = "commission-histories";

export const arenaCommission = createAsyncThunk(
  `${entity}/arenaCommission`,
  async (filter, thunkAPI) => {
    try {
      const response = await getRequest(`commission-histories${filter}`);

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

export const companyCommissions = createAsyncThunk(
  `${entity}/companyCommissions`,
  async (id, thunkAPI) => {
    try {
      const response = await getRequest(`users?id=${id}&_sort=createdAt:DESC`);

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

export const commissionHistory = createAsyncThunk(
  `${entity}`,
  async thunkAPI => {
    try {
      const response = await getRequest(
        "commission-histories?_sort=createdAt:DESC"
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

export const agentCommission = createAsyncThunk(
  `${entity}/agentCommission`,
  async (id, thunkAPI) => {
    try {
      const response = await getRequest(
        `commission-histories?agent_id.id_ne=${id}&_sort=createdAt:DESC`
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

export const regularCommission = createAsyncThunk(
  `${entity}/regularCommission`,
  async (id, thunkAPI) => {
    try {
      const response = await getRequest(
        `commission-histories?agent_id.id_eq=${id}&_sort=createdAt:DESC`
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

export const commissionStatistics = createAsyncThunk(
  `${entity}/commissionStatistics`,
  async (id, thunkAPI) => {
    try {
      const now = new Date();
      const firstDayOfLastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      );
      const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

      const firstDayOfThisMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );
      const lastDayOfThisMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      );

      const startDateLastMonth = firstDayOfLastMonth.toISOString().slice(0, 10); // "2023-01-01"
      const endDateLastMonth = lastDayOfLastMonth.toISOString().slice(0, 10); // "2023-01-31"

      const startDateCurrentMonth = firstDayOfThisMonth
        .toISOString()
        .slice(0, 10); // "2023-02-01"
      const endDateCurrentMonth = lastDayOfThisMonth.toISOString().slice(0, 10); // "2023-02-28"

      const regularCommsCurrentMonth = await getRequest(
        `commission-histories?agent_id.role_eq=${id}&createdAt_gte=${startDateCurrentMonth}&createdAt_lt=${endDateCurrentMonth}&_sort=createdAt:DESC`
      );

      const regularCommsLastMonth = await getRequest(
        `commission-histories?agent_id.role_eq=${id}&createdAt_gte=${startDateLastMonth}&createdAt_lt=${endDateLastMonth}&_sort=createdAt:DESC`
      );

      const agentCommsCurrentMonth = await getRequest(
        `commission-histories?agent_id.role_ne=${id}&createdAt_gte=${startDateCurrentMonth}&createdAt_lt=${endDateCurrentMonth}&_sort=createdAt:DESC`
      );

      const agentCommsLastMonth = await getRequest(
        `commission-histories?agent_id.role_ne=${id}&createdAt_gte=${startDateLastMonth}&createdAt_lt=${endDateLastMonth}&_sort=createdAt:DESC`
      );

      const drawCommsCurrentMonth = await getRequest(
        `commission-histories?agent_id.role_eq=${id}&createdAt_gte=${startDateCurrentMonth}&createdAt_lte=${endDateCurrentMonth}&type=draw`
      );

      const drawCommsLastMonth = await getRequest(
        `commission-histories?agent_id.role_eq=${id}&createdAt_gte=${startDateLastMonth}&createdAt_lte=${endDateLastMonth}&type=draw`
      );

      const companyCommsCurrentMonth = await getRequest(
        `commission-histories?agent_id.role_eq=${id}&createdAt_gte=${startDateCurrentMonth}&createdAt_lt=${endDateCurrentMonth}&_sort=createdAt:DESC`
      );

      const companyCommsLastMonth = await getRequest(
        `commission-histories?agent_id.role_eq=${id}&createdAt_gte=${startDateLastMonth}&createdAt_lt=${endDateLastMonth}&_sort=createdAt:DESC`
      );

      const allCommsStats = {
        regularCommsThisMonth: regularCommsCurrentMonth.data,
        regularCommsLastMonth: regularCommsLastMonth.data,
        agentCommsThisMonth: agentCommsCurrentMonth.data,
        agentCommsLastMonth: agentCommsLastMonth.data,
        drawCommsCurrentMonth: drawCommsCurrentMonth.data,
        drawCommsLastMonth: drawCommsLastMonth.data,
        companyCommsCurrentMonth: companyCommsCurrentMonth.data,
        companyCommsLastMonth: companyCommsLastMonth.data,
      };

      return allCommsStats;
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

export const grossCommision = createAsyncThunk(
  `${entity}/grossCommision`,
  async (id, thunkAPI) => {
    try {
      const response = await getRequest(
        `commission-histories?agent_id.id_eq=${id}&_sort=createdAt:DESC`
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

export const agentCommsToday = createAsyncThunk(
  `${entity}/agentCommsToday`,
  async thunkAPI => {
    try {
      const today = new Date().toISOString().slice(0, 10);

      const response = await getRequest(
        `commission-histories?agent_id.role_ne=63b4c6d8969cf0125c2b175a&createdAt_gte=${today}&createdAt_lte=${today}&_sort=createdAt:DESC`
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

export const regularCommsToday = createAsyncThunk(
  `${entity}/regularCommsToday`,
  async thunkAPI => {
    try {
      const today = new Date().toISOString().slice(0, 10);

      const response = await getRequest(
        `users?id=63b3c535c1a9151f8478f67c&createdAt_gte=${today}&createdAt_lte=${today}&_sort=createdAt:DESC`
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

export const drawCommsToday = createAsyncThunk(
  `${entity}/drawCommsToday`,
  async thunkAPI => {
    try {
      const today = new Date().toISOString().slice(0, 10);

      const response = await getRequest(
        `commission-histories?agent_id.role_eq=63b4c6d8969cf0125c2b175a&createdAt_gte=${today}&createdAt_lte=${today}&type=draw`
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

export const drawCommission = createAsyncThunk(
  `${entity}/drawCommission`,
  async (id, thunkAPI) => {
    try {
      const response = await getRequest(
        `commission-histories?agent_id.id_eq=${id}&type=draw`
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
  reducers: {},
  extraReducers: builder => {
    builder
      // Commission Statistics
      .addCase(commissionStatistics.pending, state => {
        state.statisticsIsLoading = true;
      })
      .addCase(commissionStatistics.fulfilled, (state, action) => {
        state.statisticsIsLoading = false;
        state.commissionStatistics = action.payload;
      })
      .addCase(commissionStatistics.rejected, (state, action) => {
        state.statisticsIsLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Company Commissions Today
      .addCase(regularCommsToday.pending, state => {
        state.isLoading = true;
      })
      .addCase(regularCommsToday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.regularCommsToday = action.payload;
      })
      .addCase(regularCommsToday.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Draw Commission Today
      .addCase(drawCommsToday.pending, state => {
        state.isLoading = true;
      })
      .addCase(drawCommsToday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.drawCommsToday = action.payload;
      })
      .addCase(drawCommsToday.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Agents Commission Today
      .addCase(agentCommsToday.pending, state => {
        state.isLoading = true;
      })
      .addCase(agentCommsToday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.agentCommsToday = action.payload;
      })
      .addCase(agentCommsToday.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // All Cash In
      .addCase(commissionHistory.pending, state => {
        state.isLoading = true;
      })
      .addCase(commissionHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.commissionHistory = action.payload;
      })
      .addCase(commissionHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Arena Commissions
      .addCase(arenaCommission.pending, state => {
        state.isLoading = true;
      })
      .addCase(arenaCommission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.arenaCommission = action.payload;
      })
      .addCase(arenaCommission.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Company Commissions
      .addCase(companyCommissions.pending, state => {
        state.isLoading = true;
      })
      .addCase(companyCommissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companyCommissions = action.payload[0];
      })
      .addCase(companyCommissions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Company Commissions
      .addCase(drawCommission.pending, state => {
        state.isLoading = true;
      })
      .addCase(drawCommission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.drawCommission = action.payload;
      })
      .addCase(drawCommission.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Gross Commission
      .addCase(grossCommision.pending, state => {
        state.isLoading = true;
      })
      .addCase(grossCommision.fulfilled, (state, action) => {
        state.isLoading = false;
        state.grossCommision = action.payload;
      })
      .addCase(grossCommision.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Agent Commission
      .addCase(agentCommission.pending, state => {
        state.isLoading = true;
      })
      .addCase(agentCommission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.agentCommission = action.payload;
      })
      .addCase(agentCommission.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Company Commission
      .addCase(regularCommission.pending, state => {
        state.isLoading = true;
      })
      .addCase(regularCommission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.regularCommission = action.payload;
      })
      .addCase(regularCommission.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {} = childrenSlice.actions;
export default childrenSlice.reducer;
