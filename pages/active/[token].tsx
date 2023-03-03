import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { getError } from "@/utils/error";

const Active = () => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const activate = async () => {
      try {
        const { data, status } = await axios.post(
          `${process.env.BASE_URL}/api/auth/active`,
          {
            token,
          }
        );
        if (status === 201) {
          setStatus(true);
        }
      } catch (error) {
        if (getError(error) !== "Please add your token!") {
          setMessage(getError(error));
        }
      }
    };

    activate();
  }, [token]);
  return (
    <>
      <Head>
        <title>Activate Your Account</title>
        <meta name="description" content="Activate Your Account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <div
          className={`flex justify-center items-center mt-36 mx-10 lg:mx-20`}
        >
          <Image
            src="https://www.linkpicture.com/q/Authentication-cuate.svg"
            alt="Authentication-cuate"
            width={700}
            height={700}
          />
          {status ? (
            <div className="text-1xl md:text-2xl lg:text-4xl leading-normal">
              <span className="text-green-500">
                {" "}
                <span
                  className="pi pi-check"
                  style={{ fontSize: "1rem" }}
                ></span>{" "}
                Congratulations.
              </span>
              <br /> You have successfully activated your account.{" "}
              <Link href="/login">Login</Link>
            </div>
          ) : message ? (
            <div className="text-1xl md:text-2xl lg:text-4xl leading-normal">
              <span className="text-rose-600">{message}</span>
              <br />
            </div>
          ) : (
            <div className="text-1xl md:text-2xl lg:text-4xl leading-normal">
              <span className="text-red-500">
                {" "}
                <span
                  className="pi pi-spin pi-cog"
                  style={{ fontSize: "2rem" }}
                ></span>{" "}
                Activating...
              </span>
              <br />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Active;
