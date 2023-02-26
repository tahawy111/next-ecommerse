import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthState {
  loading: boolean;
  user: any;
  msg: any;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  msg: null,
};

const baseUrl = process.env.BASE_URL;

export const register = createAsyncThunk(
  "auth/register",
  async (user: any, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/api/auth/register`, user);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(register.pending, (state: AuthState) => {
      return { ...state, loading: true };
    });
    builder.addCase(register.fulfilled, (state: AuthState, action: any) => {
      return {
        ...state,
        loading: false,
      };
    });

    builder.addCase(
      register.rejected,
      (state: AuthState, action: PayloadAction) => {
        return {
          ...state,
          loading: false,
          msg: action.payload,
          user: null,
        };
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;
