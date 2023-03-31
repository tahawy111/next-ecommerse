import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction }
    from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/utils/globals";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { IUserModel } from "@/models/User";
import { IProductModel } from '@/models/Product';

export interface CartState {
    cartItems: { item: IProductModel, quantity: number; }[];
}

const initialState: CartState = {
    cartItems: typeof window !== "undefined" && window.localStorage && localStorage.getItem("cartItems") ? JSON.parse(`${localStorage.getItem("cartItems")}`) : [],
};

const baseUrl = BASE_URL;

export const loggedInAddToCart = createAsyncThunk("cart/loggedInAddToCart", async (cart: {productId:string;userId:string | undefined}, thunkAPI) => {
    try {
        const res = await axios.post(`${baseUrl}/api/cart/addToCart`, cart);
        return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(getError(error));
    }
});


export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state: CartState, action) => {
            const product: IProductModel = action.payload.product;
            if (product.inStock < 1) {
                toast.warning("This product is out of stock");
                return;
            }
            let indexOfProduct = -1;
            for (let i = 0; i < state.cartItems.length; i++) {
                if (state.cartItems[i].item?._id === product._id) {
                    indexOfProduct = i;
                    break;
                }
            }
            if (state.cartItems.length > 0 && state.cartItems[indexOfProduct] !== undefined && state.cartItems[indexOfProduct].item._id === product._id) {
                state.cartItems[indexOfProduct].quantity += 1;
            } else {
                state.cartItems.push({ item: product, quantity: 1 });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
        },
        setCart: (state: CartState, action) => {
            localStorage.cartItems = JSON.stringify(action.payload.cartItems);
            return { ...state, cartItems: action.payload.cartItems };
        },

    },
    extraReducers: (builder: any) => {
        builder.addCase(loggedInAddToCart.pending, (state: CartState) => {
            return state;

        });
        builder.addCase(loggedInAddToCart.fulfilled, (state: CartState, action: any) => {

            return {
                ...state,
                cartItems: action.payload.cartItems
            };
        });

        builder.addCase(loggedInAddToCart.rejected, (state: CartState, action: any) => {
            toast.error(action.payload);
            return {
                ...state,
                cartItems:[]
            };
        });
    }
});

// Action creators are generated for each case reducer function
export const { addToCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
