import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/globals";
import { setUser } from "@/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Cookies from "js-cookie";
import { setCart } from "@/slices/cartSlice";
interface IProps {
    children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
    const dispatch: AppDispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);
    const { cartItems } = cart;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const firstLogin = localStorage.getItem("firstLogin");
                if (firstLogin) {
                    const { data } = await axios.get(`${BASE_URL}/api/auth/accessToken`, { withCredentials: true });
                    dispatch(setUser(data));
                }
            } catch (error) {
                localStorage.removeItem("firstLogin");
                Cookies.remove("refreshtoken", { path: "api/auth/accessToken" });
            }
        };

        fetchData();
    }, [dispatch]);
    
    return (
        <div>
            <div className="mb-3"><Navbar /></div> <div className="container mx-auto">
                {children}
            </div> </div>
    );
};

export default Layout;
