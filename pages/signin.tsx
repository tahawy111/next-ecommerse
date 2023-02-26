/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import React, { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import Link from "next/link";

const Signin = () => {
  const toast = useRef<Toast>(null);

  const handleSubmit = () => {};

  const show = () => {
    toast.current?.show({
      severity: "success",
      summary: "Form Submitted",
      detail: "Form Submitted",
    });
  };

  return (
    <div>
      <Toast ref={toast} position="bottom-right" />
      <Head>
        <title>Signin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center my-56 flex-col">
        <div className="card flex justify-center items-center flex-wrap flex-col">
        <h3 className="text-gray-500 text-3xl my-3">Sign in</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <span className="p-float-label">
              <InputText id="email" name="email" className={`w-80`} />
              <label htmlFor="email">Email</label>
            </span>
            <span className="p-float-label">
              <InputText id="password" name="password" className={`w-80`} />
              <label htmlFor="password">Password</label>
            </span>
            <Button type="submit" label="Submit" />
          </form>
          <p className="mt-3">
            You don't have an account?{" "}
            <Link href="/register" className="text-red-500 font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
