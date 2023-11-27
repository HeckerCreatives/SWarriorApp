import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest, putRequest } from "../../configs/axiosClient";

const initialState = {
    users: [],
    findAdmin: [],
    financerAgents: [],
    masterAgents: [],
    goldAgents: [],
    subAgents: [],
    moderatorUser: [],
    accountantUser: [],
    csrUser: [],
    playerUser: [],
    tableLoader: false,
    me: [],
    findOne: [],
    topPoints: [],
    loginLogs: [],
    topCommissions: [],
    savedUserDetails: [],
    findUserDetails: [],
    updatedUser: [],
    tableLoader: [],
    isLoading: false,
    findOneLoader: false,
    meLoader: false,
    isError: false,
    message: "",
  },
  entity = "users";

export const updateUser = createAsyncThunk(
  `${entity}/updateUser`,
  async (data, thunkAPI) => {
    try {
      const response = await putRequest(`/${entity}/${data.id}`, data);

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

export const loginLogs = createAsyncThunk(
  `${entity}/loginLogs`,
  async (pagination, thunkAPI) => {
    try {
      const response = await getRequest(
        `/login-logs${pagination}&_sort=createdAt:DESC`
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

export const saveUserDetails = createAsyncThunk(
  "auth/saveUserDetails",
  async (data, thunkAPI) => {
    try {
      const response = await postRequest(`user-details/upsert`, data);

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

export const findUserDetails = createAsyncThunk(
  "auth/findUserDetails",
  async (id, thunkAPI) => {
    try {
      const response = await getRequest(`user-details/user/${id}`);

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

export const topPoints = createAsyncThunk(
  "auth/topPoints",
  async (pagination, thunkAPI) => {
    try {
      const response = await getRequest(
        `${entity}/?_sort=points:DESC${pagination}`
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

export const topCommissions = createAsyncThunk(
  "auth/topCommissions",
  async (pagination, thunkAPI) => {
    try {
      const response = await getRequest(
        `${entity}/?_sort=commision:DESC${pagination}`
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

export const findAdmin = createAsyncThunk(
  "auth/findAdmin",
  async (thunkAPI) => {
    try {
      const response = await getRequest(`${entity}?_role.type=superadmin`);

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

export const findOne = createAsyncThunk(
  "auth/findOne",
  async (id, thunkAPI) => {
    try {
      const response = await getRequest(`${entity}/${id}`);

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

export const searchAgent = createAsyncThunk(
  "auth/searchAgent",
  async (data, thunkAPI) => {
    try {
      const response = await getRequest(
        `${entity}?role.type=${data.role}&username_contains=${data.searchValue}`
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

export const searchPlayer = createAsyncThunk(
  "auth/searchPlayer",
  async (data, thunkAPI) => {
    try {
      const response = await getRequest(
        `${entity}?role.type=${data.role}&username_contains=${data.searchValue}`
      );

      return { data: response.data, role: data.role };
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

export const ME = createAsyncThunk("auth/me", async (item, thunkAPI) => {
  try {
    const response = await getRequest(`${entity}/${item}`);

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const FIND = createAsyncThunk("auth/", async (filters, thunkAPI) => {
  try {
    const response = await getRequest(`${entity}${filters || ""}`);

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// ** FIND AGENTS

export const findMasterAgents = createAsyncThunk(
  "auth/master",
  async (filters, thunkAPI) => {
    try {
      const response = await getRequest(
        `${entity}?role.type=master${filters || ""}&_sort=createdAt:DESC`
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

export const findFinancerAgents = createAsyncThunk(
  "auth/financer",
  async (filters, thunkAPI) => {
    try {
      const response = await getRequest(
        `${entity}?role.type=financer${filters || ""}&_sort=createdAt:DESC`
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

export const findGoldAgents = createAsyncThunk(
  "auth/gold",
  async (filters, thunkAPI) => {
    try {
      const response = await getRequest(
        `${entity}?role.type=gold${filters || ""}&_sort=createdAt:DESC`
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

export const findSubAgents = createAsyncThunk(
  "auth/sub",
  async (filters, thunkAPI) => {
    try {
      const response = await getRequest(
        `${entity}?role.type=sub${filters || ""}&_sort=createdAt:DESC`
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

// ** FIND USERS
export const findModeratorUser = createAsyncThunk(
  "auth/moderator",
  async (filters, thunkAPI) => {
    try {
      const response = await getRequest(
        `${entity}?role.type=moderator${filters || ""}&_sort=createdAt:DESC`
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

export const findAccountantUser = createAsyncThunk(
  "auth/accountant",
  async (filters, thunkAPI) => {
    try {
      const response = await getRequest(
        `${entity}?role.type=accountant${filters || ""}&_sort=createdAt:DESC`
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

export const findCSRUser = createAsyncThunk(
  "auth/csr",
  async (filters, thunkAPI) => {
    try {
      const response = await getRequest(
        `${entity}?role.type=csr${filters || ""}&_sort=createdAt:DESC`
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

export const findPlayerUser = createAsyncThunk(
  "auth/player",
  async (filters, thunkAPI) => {
    try {
      const response = await getRequest(
        `${entity}?role.type=player${filters || ""}&_sort=createdAt:DESC`
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

      // FIND MASTER AGENT
      .addCase(findMasterAgents.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(findMasterAgents.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.masterAgents = action.payload;
      })
      .addCase(findMasterAgents.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // FIND FINANCER AGENT
      .addCase(findFinancerAgents.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(findFinancerAgents.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.financerAgents = action.payload;
      })
      .addCase(findFinancerAgents.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // FIND GOLD AGENT
      .addCase(findGoldAgents.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(findGoldAgents.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.goldAgents = action.payload;
      })
      .addCase(findGoldAgents.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // FIND SUB AGENT
      .addCase(findSubAgents.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(findSubAgents.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.subAgents = action.payload;
      })
      .addCase(findSubAgents.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // FIND MODERATOR USER
      .addCase(findModeratorUser.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(findModeratorUser.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.moderatorUser = action.payload;
      })
      .addCase(findModeratorUser.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // FIND ACCOUNTANT USER
      .addCase(findAccountantUser.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(findAccountantUser.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.accountantUser = action.payload;
      })
      .addCase(findAccountantUser.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // FIND CSR USER
      .addCase(findCSRUser.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(findCSRUser.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.csrUser = action.payload;
      })
      .addCase(findCSRUser.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // FIND PLAYER USER
      .addCase(findPlayerUser.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(findPlayerUser.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.playerUser = action.payload;
      })
      .addCase(findPlayerUser.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Login User Logs
      .addCase(loginLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loginLogs = action.payload;
      })
      .addCase(loginLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updatedUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ME
      .addCase(ME.pending, (state) => {
        state.isLoading = true;
        state.meLoader = true;
      })
      .addCase(ME.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meLoader = false;
        state.me = action.payload;
      })
      .addCase(ME.rejected, (state, action) => {
        state.isLoading = false;
        state.meLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Save User Details
      .addCase(saveUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedUserDetails = action.payload;
      })
      .addCase(saveUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Find User Details
      .addCase(findUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.findUserDetails = action.payload;
      })
      .addCase(findUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.findUserDetails = [];
      })

      // FIND
      .addCase(FIND.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(FIND.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.users = action.payload;
      })
      .addCase(FIND.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Search Agent
      .addCase(searchAgent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchAgent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(searchAgent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Search Player
      .addCase(searchPlayer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchPlayer.fulfilled, (state, action) => {
        switch (action.payload.role) {
          case "accountant":
            state.accountantUser = action.payload.data;
            break;
          case "moderator":
            state.moderatorUser = action.payload.data;
            break;
          case "csr":
            state.csrUser = action.payload.data;
            break;

          case "financer":
            state.financerAgents = action.payload.data;
            break;
          case "sub":
            state.subAgents = action.payload.data;
            break;
          case "master":
            state.masterAgents = action.payload.data;
            break;
          case "gold":
            state.goldAgents = action.payload.data;
            break;
          case "player":
            state.playerUser = action.payload.data;
            break;
        }
        state.isLoading = false;
      })
      .addCase(searchPlayer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // FIND ADMIN
      .addCase(findAdmin.pending, (state) => {
        state.isLoading = true;
        state.findAdminLoader = true;
      })
      .addCase(findAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.findAdminLoader = false;
        state.findAdmin = action.payload[0];
      })
      .addCase(findAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.findAdminLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // FIND ONE
      .addCase(findOne.pending, (state) => {
        state.isLoading = true;
        state.findOneLoader = true;
      })
      .addCase(findOne.fulfilled, (state, action) => {
        state.isLoading = false;
        state.findOneLoader = false;
        state.findOne = action.payload;
      })
      .addCase(findOne.rejected, (state, action) => {
        state.isLoading = false;
        state.findOneLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // TOP POINTS
      .addCase(topPoints.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(topPoints.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.topPoints = action.payload;
      })
      .addCase(topPoints.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      })

      // TOP COMMISIONS
      .addCase(topCommissions.pending, (state) => {
        state.tableLoader = true;
      })
      .addCase(topCommissions.fulfilled, (state, action) => {
        state.tableLoader = false;
        state.topCommissions = action.payload;
      })
      .addCase(topCommissions.rejected, (state, action) => {
        state.tableLoader = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET } = childrenSlice.actions;
export default childrenSlice.reducer;
