import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  console.log(router);
  const isActive = (r: string): string =>
    r === router.pathname ? "active" : "";
  const items = [
    {
      label: (
        <div className={`${isActive("/cart") ? "font-bold" : ""}`}>Cart</div>
      ),
      icon: (
        <i
          className={`pi pi-fw pi-shopping-cart mr-1 ${
            isActive("/cart") ? "before:font-bold" : ""
          }`}
        ></i>
      ),
      command: () => router.push("/cart"),
      // items: [
      //   {
      //     label: "New",
      //     icon: "pi pi-fw pi-plus",
      //     items: [
      //       {
      //         label: "Bookmark",
      //         icon: "pi pi-fw pi-bookmark",
      //       },
      //       {
      //         label: "Video",
      //         icon: "pi pi-fw pi-video",
      //       },
      //     ],
      //   },
      //   {
      //     label: "Delete",
      //     icon: "pi pi-fw pi-trash",
      //   },
      //   {
      //     separator: true,
      //   },
      //   {
      //     label: "Export",
      //     icon: "pi pi-fw pi-external-link",
      //   },
      // ],
    },
    {
      label: (
        <div className={`${isActive("/signin") ? "font-bold" : ""}`}>
          Sign in
        </div>
      ),
      icon: (
        <i
          className={`pi pi-fw pi-user mr-1 ${
            isActive("/signin") ? "before:font-bold" : ""
          }`}
        ></i>
      ),
      command: () => router.push("/signin"),
      // items: [
      //   {
      //     label: "Left",
      //     icon: "pi pi-fw pi-align-left",
      //   },
      //   {
      //     label: "Right",
      //     icon: "pi pi-fw pi-align-right",
      //   },
      //   {
      //     label: "Center",
      //     icon: "pi pi-fw pi-align-center",
      //   },
      //   {
      //     label: "Justify",
      //     icon: "pi pi-fw pi-align-justify",
      //   },
      // ],
    },
  ];

  const start = (
    <>
      <Link href="/">
        <h1 className="text-3xl font-bold text-zinc-700">Tahawy Shop</h1>
      </Link>
    </>
  );
  const end = <InputText placeholder="Search" type="text" className="w-full" />;

  return (
    <div>
      <Menubar className="justify-between" model={items} start={start} />
    </div>
  );
};

export default Navbar;
