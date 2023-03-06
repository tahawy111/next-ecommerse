import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Loading() {
  const { loading } = useSelector((state: RootState) => state.global);
  return (
    <div
      className={`${
        loading ? "flex" : "hidden"
      } fixed w-full h-screen text-center justify-center items-center text-white top-0 left-0 z-[1]`}
      style={{
        background: "#0007",
      }}
    >
      <div className="w-16 h-16 rounded-full border-gray-100 border-8 border-t-teal-500 animate-spin-fast"></div>
    </div>
  );
}
