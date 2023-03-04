/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Link from "next/link";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { IFormEvent, InputChange } from "@/utils/Typescript";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import axios from "axios";
import { getError } from "@/utils/error";
import { startLoading, stopLoading } from "@/slices/globalSlice";
import { toast } from "react-toastify";
import { validEmail } from "@/utils/valid";
import { BASE_URL } from "@/utils/globals";

const Register = () => {
  const initalState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const dispatch: AppDispatch = useDispatch();

  const [userData, setUserData] = useState(initalState);
  const handleInputChange = ({ target }: InputChange) => {
    const { name, value } = target;
    setUserData({ ...userData, [name]: value });
  };

  function containsUppercase(str: string) {
    return /[A-Z]/.test(str);
  }
  function containsLowercase(str: string) {
    return /[a-z]/.test(str);
  }

  function containsNumbers(str: string) {
    return /[0-9]/.test(str);
  }
  const handleSubmit = async (e: IFormEvent) => {
    e.preventDefault();

    if (!userData.name) return toast.warning(`Name isn't exist`);
    if (!validEmail(userData.email)) return toast.warning(`Email isn't valid`);

    if (userData.password !== userData.confirmPassword)
      return toast.warning(`Passwords doesn't match.`);
    if (userData.password.length < 8 || userData.confirmPassword.length < 8)
      return toast.warning(`Passwords must be at least 8 chars.`);

    if (!containsNumbers(userData.password)) {
      return toast.warning("Passwords must be at least one numeric.");
    }
    if (!containsUppercase(userData.password)) {
      return toast.warning("Passwords must be at one uppercase.");
    }
    if (!containsLowercase(userData.password)) {
      return toast.warning("Passwords must be at one lowercase");
    }

    dispatch(startLoading());
    try {
      const { data, status } = await axios.post(
        `${BASE_URL}/api/auth/register`,
        userData
      );
      if (status === 200) {
        toast.success(data.msg);
      }
    } catch (error) {
      toast.error(getError(error));
    }
    dispatch(stopLoading());
  };
  const header = <div className="font-bold mb-3">Pick a password</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center my-40 flex-col">
        <div className="card flex justify-center items-center flex-wrap flex-col">
          <h3 className="text-gray-500 text-3xl my-3">Register</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <span className="p-float-label">
              <InputText
                id="name"
                name="name"
                maxLength={20}
                className={`w-80`}
                onChange={handleInputChange}
              />
              <label htmlFor="name">Name</label>
            </span>
            <span className="p-float-label">
              <InputText
                id="email"
                name="email"
                className={`w-80`}
                onChange={handleInputChange}
              />
              <label htmlFor="email">Email</label>
            </span>
            <span className="p-float-label">
              <Password
                id="password"
                name="password"
                onChange={handleInputChange}
                toggleMask
                header={header}
                footer={footer}
              />
              <label htmlFor="password">Password</label>
            </span>
            <span className="p-float-label">
              <Password
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleInputChange}
                header={header}
                footer={footer}
                toggleMask
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </span>
            {/* <Password className={`w-80`} value={value} onChange={(e) => setValue(e.target.value)} header={header} footer={footer} /> */}
            <Button type="submit" label="Register" />
          </form>
          <p className="mt-3">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-red-500 font-bold hover:underline"
            >
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
