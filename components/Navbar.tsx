import React, { useEffect, useState } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const isActive = (r: string): string =>
    r === router.pathname ? "active" : "";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full py-4 bg-[#f8f9fa] border-b-2 md:flex md:items-center justify-between gap-3 flex-col md:flex-row">
      <h1 className="text-3xl font-bold text-zinc-700 ml-3">Tahawy Shop</h1>
      <div
        className="block md:hidden fixed right-4 top-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiMenu size={23} /> : <IoMdClose size={23} />}
      </div>
      <ul
        className={`flex gap-1 mr-3 flex-col md:flex-row mt-3 md:top-5 md:right-0 md:mt-0 ${
          isOpen ? "fixed top-[-9999px] border-t-white" : "top-0"
        }`}
      >
        {isLoggedIn && (
          <li className="hover:bg-[#e9ecef] px-5 py-1 rounded-lg flex gap-x-2 items-center active:bg-gray-200">
            <AiOutlineShoppingCart />
            <Link href="/cart">Cart</Link>
          </li>
        )}
        {!isLoggedIn && (
          <li className="hover:bg-[#e9ecef] px-5 py-1 rounded-lg flex gap-x-2 items-center active:bg-gray-200">
            <BsFillPersonFill />
            <Link href="/signin">Sign in</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
