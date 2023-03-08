import React, {useState, useRef, useEffect} from "react";
import {Menubar} from "primereact/menubar";
import {InputText} from "primereact/inputtext";
import Image from "next/image";
import {useRouter} from "next/router";
import Link from "next/link";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {BsFillPersonFill} from "react-icons/bs";
import {FiMenu} from "react-icons/fi";
import {IoMdClose} from "react-icons/io";
import {Avatar} from "primereact/avatar";
import {Menu} from "primereact/menu";
import {MenuItem} from "primereact/menuitem";
import {RootState, AppDispatch} from "@/store";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";
import {logout} from "@/slices/authSlice";

const Navbar = () => {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const {isLoggedIn, userInfo} = useSelector((state : RootState) => state.auth);
    const isActive = (r : string) : string => r === router.pathname ? "active" : "";
    const menu = useRef < Menu > (null);
    const items: MenuItem[] = [{
            label: "Options",
            items: [
                {
                    label: "Profile",
                    icon: <BsFillPersonFill className="mr-3"/>,
                    command: () => {
                        router.push("/");
                    }
                }, {
                    label: "Logout",
                    icon: "pi pi-fw pi-power-off",
                    command: () => {
                        Cookies.remove("refreshtoken", {path: "api/auth/accessToken"});
                        localStorage.removeItem("firstLogin");
                        dispatch(logout());
                        router.push("/signin");
                    }
                },
            ]
        },];
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full py-2 bg-[#f8f9fa] border-b-2 md:flex md:items-center justify-between gap-3 flex-col md:flex-row">
            <h1 className="text-3xl font-bold text-zinc-700 ml-3">Tahawy Shop</h1>
            <div className="block md:hidden fixed right-4 top-6"
                onClick={
                    () => setIsOpen(!isOpen)
            }>
                {
                isOpen ? <FiMenu size={23}/> : <IoMdClose size={23}/>
            } </div>
            <ul className={
                `flex gap-1 mr-3 flex-col md:flex-row mt-3 md:top-5 md:right-0 md:mt-0 ${
                    isOpen ? "fixed top-[-9999px] border-t-white" : "top-0"
                }`
            }>
                {
                isLoggedIn && (
                    <li className="hover:bg-[#e9ecef] px-5 py-1 rounded-lg flex gap-x-2 items-center active:bg-gray-200">
                        <AiOutlineShoppingCart/>
                        <Link href="/cart">Cart</Link>
                    </li>
                )
            }
                {
                isLoggedIn && (
                    <>
                        <Menu model={items}
                            popup
                            ref={menu}/>
                        <div className="hover:bg-[#e9ecef] px-5 py-1 rounded-lg flex gap-x-2 items-center active:bg-gray-200"
                            onClick={
                                (e : any) => menu ?. current ?. toggle(e)
                        }>
                            <Avatar image={
                                    userInfo ?. user ?. avatar
                                }
                                size="large"
                                shape="circle"/>
                            <p>{
                                userInfo ?. user.name
                            }</p>
                        </div>
                    </>
                )
            }
                {
                !isLoggedIn && (
                    <li className="hover:bg-[#e9ecef] px-5 py-1 rounded-lg flex gap-x-2 items-center active:bg-gray-200">
                        <BsFillPersonFill/>
                        <Link href="/signin">Sign in</Link>
                    </li>
                )
            } </ul>
        </div>
    );
};

export default Navbar;
