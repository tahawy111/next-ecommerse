import Layout from '@/components/Layout'
import { IProductModel } from '@/models/Product'
import { BASE_URL, capitalize } from '@/utils/globals'
import axios from 'axios'
import Head from 'next/head'
import React, { useState } from 'react'
interface IProps {
    product: IProductModel;
}
const DetailProduct = ({ product }: IProps) => {
    const [imgIndex,setImgIndex] = useState(0)
    return (
        <Layout>
            <Head>
                <title>Tahawy Shop - {capitalize(product.title)}</title>
                <meta name="description" content="Product Page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className='grid grid-cols-2 gap-x-3'>
                <div className="flex items-center">
                    <div className="w-fit mx-3">                            {product.images.map(({ url }, index) => (
                        <img key={index} className={`w-40 border border-[#ddd] rounded-lg p-1 hover:border-black dark:border-black dark:hover:border-[#ddd] ${index === imgIndex && "border-black"}`} onClick={() => setImgIndex(index)} src={url} alt={url} />
                    ))}</div>
                    <div>
                        <img className='border border-[#ddd] rounded-lg p-1 w-full object-cover' src={product.images[imgIndex].url} alt={product.images[imgIndex].url} />
                    </div>
                </div>
                <div className="">Hello</div>
            </div>

        </Layout>
    )
}

export default DetailProduct

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
    const { data } = await axios.get(`${BASE_URL}/api/product/${id}`)
    return {
        props: { product: data.product }, // will be passed to the page component as props
    }
}