import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction }
    from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/utils/globals";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { IUserModel } from "@/models/User";

export interface AuthState {
    loading: boolean;
    userInfo: {
        access_token: string;
        user: IUserModel;
    } | null;
    isLoggedIn: boolean;
    msg: any;
}

const initialState: AuthState = {
    loading: false,
    userInfo: null,
    isLoggedIn: false,
    msg: null
};

const baseUrl = BASE_URL;

export const login = createAsyncThunk("auth/login", async (user: {
    email: string;
    password: string;
}, thunkAPI) => {
    try {
        const res = await axios.post(`${baseUrl}/api/auth/login`, user);

        localStorage.setItem("firstLogin", JSON.stringify(true));
        Cookies.set("refreshtoken", res.data.refresh_token, {
            expires: 7,
            path: "api/auth/accessToken"
        });
        return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(getError(error));
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state: AuthState, action: any) => {
            return {
                ...state,
                isLoggedIn: true,
                userInfo: {
                    user: action.payload.user,
                    access_token: action.payload.accessToken
                }
            };
        },
        logout: (state: AuthState) => {
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            };
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(login.pending, (state: AuthState) => {
            return {
                ...state,
                loading: true,
                isLoggedIn: false
            };
        });
        builder.addCase(login.fulfilled, (state: AuthState, action: any) => {
            toast.success(action.payload.msg);

            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                userInfo: {
                    user: action.payload.user,
                    access_token: action.payload.access_token
                }
            };
        });

        builder.addCase(login.rejected, (state: AuthState, action: any) => {
            toast.error(action.payload);
            return {
                ...state,
                loading: false,
                msg: action.payload,
                userInfo: null
            };
        });
    }
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
