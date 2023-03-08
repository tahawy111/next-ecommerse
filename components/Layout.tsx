import React from "react";
import Navbar from "./Navbar";
import {useEffect} from "react";
import axios from "axios";
import {BASE_URL} from "@/utils/globals";
import {setUser} from "@/slices/authSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import Cookies from "js-cookie";
interface IProps {
    children: React.ReactNode;
}

const Layout: React.FC < IProps > = ({children}) => {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const firstLogin = localStorage.getItem("firstLogin");
                if (firstLogin) {
                    const {data} = await axios.get(`${BASE_URL}/api/auth/accessToken`, {withCredentials: true});
                    dispatch(setUser(data));
                }
            } catch (error) {
                localStorage.removeItem("firstLogin");
                Cookies.remove("refreshtoken", {path: "api/auth/accessToken"});
            }
        };

        fetchData();
    }, [dispatch]);
    return (
        <div>
            <Navbar/> {children} </div>
    );
};

export default Layout;
