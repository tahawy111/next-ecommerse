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
      <ProgressSpinner
        style={{ width: "70px", height: "70px" }}
        strokeWidth="5"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>
  );
}
