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
import { useEffect } from 'react';
import ThemeChanger from "./ThemeChanger";

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
  // const [mounted,setMounted] = useState(false)
  // useEffect(() => {
  //   setMounted(true)
  // },[])
  // const {systemTheme,theme,setTheme} = useTheme()
  //  const  renderThemeSwitcher = () => {
  //   if(!mounted) return null;
  //   const currentTheme = theme === "system" ? systemTheme : theme
  //   switch(currentTheme) {
  //     case "dark":
  //       return (<span onClick={() => setTheme("light")} className="material-icons-outlined">
  //       light_mode
  //       </span>)
  //       break;
  //       case "light": 
  //             return (<span onClick={() => setTheme("dark")} className="material-icons-outlined">
  //             dark_mode
  //             </span>)
  //       break;

  //       default:""
  //   }
  //  }
  return (
    // <div className='shadow-md w-full top-0 left-0'>
    //   <div className='md:flex items-center justify-between bg-[#f8f9fa] py-4 md:px-10 px-7'>
    //     <div className='font-bold text-2xl cursor-pointer flex items-center 
    //   text-gray-800'>
    //       Tahawy Shop
    //     </div>

    //     <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
    //       {open ? <IoMdClose size={23} /> : <FiMenu size={23} />}
    //     </div>

    //     <ul className={`md:flex md:items-center md:pb-0 pb-5 absolute md:static bg-[#f8f9fa] md:z-auto left-0 w-full md:w-auto md:pl-0 ${open ? 'top-16' : 'top-[-490px]'}`}>

    //       {isLoggedIn ? <>
    //         <li className="hover:bg-[#e9ecef] px-5 py-1 rounded-lg flex gap-x-2 items-center active:bg-gray-200">
    //           <AiOutlineShoppingCart />
    //           <Link href="/cart">Cart</Link>
    //         </li>
    //         <Menu model={items}
    //           popup
    //           ref={menu} />
    //         <div className="hover:bg-[#e9ecef] px-5 py-1 rounded-lg flex gap-x-2 items-center active:bg-gray-200"
    //           onClick={
    //             (e: any) => menu?.current?.toggle(e)
    //           }>
    //           <Avatar image={
    //             userInfo?.user?.avatar
    //           }
    //             size="normal"
    //             shape="circle" />
    //           <p>{
    //             userInfo?.user.name
    //           }</p>
    //         </div>
    //       </> : <>
    //         <li className="hover:bg-[#e9ecef] px-5 py-1 rounded-lg flex gap-x-2 items-center active:bg-gray-200">
    //           <BsFillPersonFill />
    //           <Link href="/signin">Sign in</Link>
    //         </li>
    //       </>}

    //     </ul>
    //   </div>
    // </div>
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li tabIndex={0}>
              <a className="justify-between">
                Parent
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
              </a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <Link href={`/`} className="btn btn-ghost normal-case text-xl">Tahawy Shop</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {<ThemeChanger />}
      </div>
      <div className="navbar-end">
        {/* <ul className="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li tabIndex={0}>
            <a>
              Parent
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </a>
            <ul className="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Item 3</a></li>
        </ul> */}

        {isLoggedIn ? <ul className="menu menu-horizontal px-1">
          <li className="mx-1"><Link href="/cart"><span className="material-icons-outlined">
shopping_cart
</span> Cart</Link></li>
          <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={userInfo?.user.avatar}/>
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li onClick={() => {
                    Cookies.remove("refreshtoken", { path: "api/auth/accessToken" });
                    localStorage.removeItem("firstLogin");
                    dispatch(logout());
                    router.push("/signin");
        } }><a>Logout</a></li>
      </ul>
    </div>
        </ul> : <ul className="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li tabIndex={0}>
            <a>
              Parent
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </a>
            <ul className="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Item 3</a></li>
        </ul>}

      </div>
    </div>
  )
}

export default Navbar