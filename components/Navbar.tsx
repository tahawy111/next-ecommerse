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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn, userInfo } = useSelector((state: RootState) => state.auth);
  const isActive = (r: string): string => r === router.pathname ? "active" : "";
  const navLinks = (isLoggedIn ? 
    <>
          <li>{<ThemeChanger noCenter={isMenuOpen} />}</li>
      <li className="mx-1"><Link href="/cart"><span className="material-icons-outlined">
  shopping_cart
  </span> Cart</Link></li>
    <li>
    <div className="dropdown dropdown-end">
  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
    <div className="w-10 rounded-full">
      <img src={userInfo?.user.avatar}/>
    </div>
  </label>
  <ul tabIndex={0} className="mt-40 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
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
    </li>
<li>
<span onClick={() => setIsMenuOpen((prev) => !prev)} className="block material-icons-outlined md:hidden cursor-pointer">
close
</span>
</li>
    </> : <>
    <li>{<ThemeChanger  noCenter={isMenuOpen} />}</li>
      <li><Link href={'/signin'}>Sign In</Link></li>
      <li>
<span onClick={() => setIsMenuOpen((prev) => !prev)} className="block material-icons-outlined md:hidden cursor-pointer">
close
</span>
</li>
    </>)

  return (
  

    <div className={`navbar bg-base-100 shadow-md`}>
      <div className="navbar-start">
        <Link href={`/`} className="btn btn-ghost normal-case text-xl">Tahawy Shop</Link>
      </div>
      <div className="navbar-end">

      {isMenuOpen ? <span onClick={() => setIsMenuOpen((prev) => !prev)} className="block material-icons-outlined md:hidden cursor-pointer">
close
</span> : <span onClick={() => setIsMenuOpen((prev) => !prev)} className="block material-icons-outlined md:hidden cursor-pointer">
menu
</span>}

      <ul className="hidden menu menu-horizontal px-1 md:flex">
        {navLinks}
      </ul>

{isMenuOpen && <ul className="md:hidden menu px-1 fixed top-0 left-0 opacity-95 bg-white dark:bg-[#2a303c] w-80 md:w-96 rounded-lg shadow-md z-[9999]">
        {navLinks}
      </ul>}
 

      </div>
    </div>
  )
}

export default Navbar