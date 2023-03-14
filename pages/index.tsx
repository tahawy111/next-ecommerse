import Layout from "@/components/Layout";
import Cookies from "js-cookie";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>Tahawy Shop</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Layout>
                <h1 className="text-3xl font-bold underline">Hello world!</h1>
            </Layout>
        </>
    );
}
