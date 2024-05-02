import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (args, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      if (!token) {
        return rejectWithValue("Token?");
      }
      const { data } = await axios.get("auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (creds, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("auth/login", creds);
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isLoading: false,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  console.log("Rejected with payload:", action?.payload);
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, handlePending)
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        handleRejected(state, action);
        state.user = null;
        state.token = null;
      })
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(login.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;

export const selectAuthenticatedUser = (state) => state.auth.user;
export const selectIsLoading = (state) => state.auth.isLoading;
