import Layout from "@/components/Layout";
import Head from "next/head";
import React from "react";

const Cart = () => {
    return (
        <div>
            <Head>
                <title>Cart</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
<Layout>
<span className="text-5xl">Cart
            </span>
            <span className="material-icons-sharp text-red-800 text-8xl">
info
</span>
</Layout>
        </div>
    );
};

export default Cart;
