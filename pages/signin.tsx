import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Link from "next/link";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { validEmail } from "@/utils/valid";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { login } from "@/slices/authSlice";
import { startLoading, stopLoading } from "@/slices/globalSlice";
import { IFormEvent, InputChange } from "@/utils/Typescript";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Signin = () => {
    const [rfToken, setRfToken] = useState("");
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter()
    const { isLoggedIn } = useSelector((state: RootState) => state.auth)
    const handleSubmit = async (e: IFormEvent) => {
        e.preventDefault();
        if (!userData.email)
            return toast.warning(`Email isn't exist.`);



        if (!validEmail(userData.email))
            return toast.warning(`Email isn't valid`);



        if (!userData.password)
            return toast.warning(`Password isn't exist.`);



        if (userData.password.length < 8)
            return toast.warning(`Password must be at least 6 chars.`);



        dispatch(startLoading());

        await dispatch(login(userData));

        router.push("/");

        dispatch(stopLoading());
    };

    const handleInputChange = ({ target }: InputChange) => {
        const { name, value } = target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const [userData, setUserData] = useState({ email: "", password: "" });





    return (
        <div>
            <Head>
                <title>Sign in</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex justify-center my-56 flex-col">
                <div className="card flex justify-center items-center flex-wrap flex-col">
                    <h3 className="text-gray-500 text-3xl my-3">Sign in</h3>
                    <form onSubmit={handleSubmit}
                        className="flex flex-col gap-6">
                        <span className="p-float-label">
                            <InputText id="email" name="email"
                                className={`w-80`}
                                onChange={handleInputChange} />
                            <label htmlFor="email">Email</label>
                        </span>
                        <span className="p-float-label">
                            <Password id="password" name="password"
                                onChange={handleInputChange}
                                toggleMask
                                feedback={false}
                            />
                            <label htmlFor="password">Password</label>
                        </span>
                        {/* <Password className={`w-80`} value={value} onChange={(e) => setValue(e.target.value)} header={header} footer={footer} /> */}
                        <Button type="submit" label="Sign in" />
                    </form>
                    <p className="mt-3">
                        You don't have an account?{" "}
                        <Link href="/register" className="text-red-500 font-bold hover:underline">
                            Register Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};;

export default Signin;
