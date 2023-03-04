import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/utils/globals";
import Cookie from "js-cookie";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";

export interface AuthState {
  loading: boolean;
  userInfo: any;
  msg: any;
}

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  msg: null,
};

const baseUrl = BASE_URL;

export const login = createAsyncThunk(
  "auth/login",
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/api/auth/login`, user);
      Cookie.set("refreshtoken", res.data.refresh_token, {
        path: "/api/auth/accessToken",
        expires: 7,
      });
      localStorage.setItem("firstLogin", JSON.stringify(true));
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(login.pending, (state: AuthState) => {
      return { ...state, loading: true };
    });
    builder.addCase(login.fulfilled, (state: AuthState, action: any) => {
      toast.success(action.payload.msg);

      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    });

    builder.addCase(login.rejected, (state: AuthState, action: any) => {
      toast.error(action.payload);
      return {
        ...state,
        loading: false,
        msg: action.payload,
        user: null,
      };
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;
