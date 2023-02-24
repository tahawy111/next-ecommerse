import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const items = [
    {
      label: "File",
      icon: "pi pi-fw pi-file",
      command: () => router.push("/product"),
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          items: [
            {
              label: "Bookmark",
              icon: "pi pi-fw pi-bookmark",
            },
            {
              label: "Video",
              icon: "pi pi-fw pi-video",
            },
          ],
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash",
        },
        {
          separator: true,
        },
        {
          label: "Export",
          icon: "pi pi-fw pi-external-link",
        },
      ],
    },
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: "Left",
          icon: "pi pi-fw pi-align-left",
        },
        {
          label: "Right",
          icon: "pi pi-fw pi-align-right",
        },
        {
          label: "Center",
          icon: "pi pi-fw pi-align-center",
        },
        {
          label: "Justify",
          icon: "pi pi-fw pi-align-justify",
        },
      ],
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
