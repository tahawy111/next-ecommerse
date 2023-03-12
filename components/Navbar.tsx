// import React, { useState, useRef, useEffect } from "react";
// import { Menubar } from "primereact/menubar";
// import { InputText } from "primereact/inputtext";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { BsFillPersonFill } from "react-icons/bs";
// import { FiMenu } from "react-icons/fi";
// import { IoMdClose } from "react-icons/io";
// import { Avatar } from "primereact/avatar";
// import { Menu } from "primereact/menu";
// import { MenuItem } from "primereact/menuitem";
// import { RootState, AppDispatch } from "@/store";
// import { useDispatch, useSelector } from "react-redux";
// import Cookies from "js-cookie";
// import { logout } from "@/slices/authSlice";

// const Navbar = () => {
//     const dispatch: AppDispatch = useDispatch();
//     const router = useRouter();
//     const { isLoggedIn, userInfo } = useSelector((state: RootState) => state.auth);
//     const isActive = (r: string): string => r === router.pathname ? "active" : "";
//     const menu = useRef<Menu>(null);
//     const items: MenuItem[] = [{
//         label: "Options",
//         items: [
//             {
//                 label: "Profile",
//                 icon: <BsFillPersonFill className="mr-3" />,
//                 command: () => {
//                     router.push("/");
//                 }
//             }, {
//                 label: "Logout",
//                 icon: "pi pi-fw pi-power-off",
//                 command: () => {
//                     Cookies.remove("refreshtoken", { path: "api/auth/accessToken" });
//                     localStorage.removeItem("firstLogin");
//                     dispatch(logout());
//                     router.push("/signin");
//                 }
//             },
//         ]
//     },];
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     return (
//         <div className="w-full py-2 bg-[#f8f9fa] border-b-2 md:flex md:items-center justify-between gap-3 flex-col md:flex-row">
//             <h1 className="text-3xl font-bold text-zinc-700 ml-3">Tahawy Shop</h1>
//             <div className="block md:hidden fixed right-4 top-6"
//                 onClick={
//                     () => setIsMenuOpen((prev) => !prev)
//                 }>
//                 {
//                     isMenuOpen ? <FiMenu size={23} /> : <IoMdClose size={23} />
//                 } </div>
//             <ul className={
//                 `flex gap-1 mr-3 flex-col md:flex-row mt-3 md:top-5 md:right-0 md:mt-0 ${!isMenuOpen ? "fixed top-[-9999px] border-t-white" : ""
//                 }`
//             }>
//                 {
//                     isLoggedIn && (
//                         <li className="hover:bg-[#e9ecef] px-5 py-1 rounded-lg flex gap-x-2 items-center active:bg-gray-200">
//                             <AiOutlineShoppingCart />
//                             <Link href="/cart">Cart</Link>
//                         </li>
//                     )
//                 }
//                 {
//                     isLoggedIn && (
//                         <>
// <Menu model={items}
//     popup
//     ref={menu} />
// <div className="hover:bg-[#e9ecef] px-5 py-1 rounded-lg flex gap-x-2 items-center active:bg-gray-200"
//     onClick={
//         (e: any) => menu?.current?.toggle(e)
//     }>
//     <Avatar image={
//         userInfo?.user?.avatar
//     }
//         size="large"
//         shape="circle" />
//     <p>{
//         userInfo?.user.name
//     }</p>
// </div>
//                         </>
//                     )
//                 }
//                 {
//                     !isLoggedIn && (
//                         <li className="hover:bg-[#e9ecef] px-5 py-1 rounded-lg flex gap-x-2 items-center active:bg-gray-200">
//                             <BsFillPersonFill />
//                             <Link href="/signin">Sign in</Link>
//                         </li>
//                     )
//                 } </ul>
//         </div>
//     );
// };

// export default Navbar;


import React, { useRef, useState } from 'react'
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { RootState, AppDispatch } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { MenuItem } from 'primereact/menuitem';
import Cookies from 'js-cookie';
import { logout } from '@/slices/authSlice';
import Link from 'next/link';

const Navbar = () => {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "SERVICE", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "BLOG'S", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  const [open, setOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn, userInfo } = useSelector((state: RootState) => state.auth);
  const isActive = (r: string): string => r === router.pathname ? "active" : "";
  const menu = useRef<Menu>(null);
  const items: MenuItem[] = [{
    label: "Options",
    items: [
      {
        label: "Profile",
        icon: <BsFillPersonFill className="mr-3" />,
        command: () => {
          router.push("/");
        }
      }, {
        label: "Logout",
        icon: "pi pi-fw pi-power-off",
        command: () => {
          Cookies.remove("refreshtoken", { path: "api/auth/accessToken" });
          localStorage.removeItem("firstLogin");
          dispatch(logout());
          router.push("/signin");
        }
      },
    ]
  },];
  return (
    <div className='shadow-md w-full top-0 left-0'>
      <div className='md:flex items-center justify-between bg-[#f8f9fa] py-4 md:px-10 px-7'>
        <div className='font-bold text-2xl cursor-pointer flex items-center 
      text-gray-800'>
          Tahawy Shop
        </div>

        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
          {open ? <IoMdClose size={23} /> : <FiMenu size={23} />}
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-5 absolute md:static bg-[#f8f9fa] md:z-auto opacity-90 left-0 w-full md:w-auto md:pl-0 ${open ? 'top-16' : 'top-[-490px]'}`}>

          {isLoggedIn ? <>
            <li className="hover:bg-[#e9ecef] px-5 py-1 rounded-lg flex gap-x-2 items-center active:bg-gray-200">
              <AiOutlineShoppingCart />
              <Link href="/cart">Cart</Link>
            </li>
            <Menu model={items}
              popup
              ref={menu} />
            <div className="hover:bg-[#e9ecef] px-5 py-1 rounded-lg flex gap-x-2 items-center active:bg-gray-200"
              onClick={
                (e: any) => menu?.current?.toggle(e)
              }>
              <Avatar image={
                userInfo?.user?.avatar
              }
                size="normal"
                shape="circle" />
              <p>{
                userInfo?.user.name
              }</p>
            </div>
          </> : <>
            <li className="hover:bg-[#e9ecef] px-5 py-1 rounded-lg flex gap-x-2 items-center active:bg-gray-200">
              <BsFillPersonFill />
              <Link href="/signin">Sign in</Link>
            </li>
          </>}

        </ul>
      </div>
    </div>
  )
}

export default Navbar