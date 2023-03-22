import Layout from '@/components/Layout'
import { IProductModel } from '@/models/Product'
import { BASE_URL, capitalize } from '@/utils/globals'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
interface IProps {
    product: IProductModel;
}
const DetailProduct = ({ product }: IProps) => {
    const [imgIndex, setImgIndex] = useState(0);
    const [imgIndexTransform, setImgIndexTransform] = useState(0);
    const divImagesRef = useRef<HTMLImageElement>(null)
    const [imgsWidth,setImgsWidth] = useState<any>(null)

    useEffect(() => {
        console.log({pro:product.images.length * 84,imgIndexTransform:imgIndexTransform * 84})
    },[imgIndexTransform])
    return (
        <Layout>
            <Head>
                <title>Tahawy Shop - {capitalize(product.title)}</title>
                <meta name="description" content="Product Page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className='grid grid-cols-2 gap-x-3'>
                <div className="grid">

                    <div className={`w-[600px]`}>
                        <img className='border border-[#ddd] rounded-lg p-1 w-full h-[520px]' src={product.images[imgIndex].url} alt={product.images[imgIndex].url} />
                        <div className={`flex mx-3 items-center justify-center`}>
                            <span className={`material-icons-outlined cursor-pointer select-none ${product.images.length < 7 && "pointer-events-none opacity-50"}`} onClick={() => setImgIndexTransform((prev) => prev - 1 )}>
                                arrow_back_ios
                            </span>
                            <div className={`flex overflow-hidden transition-transform duration-150 gap-x-3`}>
                            {product.images.map(({ url }, index) => (
                                <img ref={divImagesRef} style={{transform:`translateX(-${imgIndexTransform * 100}px)`}} key={index} className={`transition-transform duration-150 h-[80px] w-[80px] cursor-pointer object-cover border border-[#ddd] rounded-lg p-1 hover:border-black dark:border-black dark:hover:border-[#e0ac3bcc] ${index === imgIndex && "border-black dark:border-[#ddd]"}`} onClick={() => setImgIndex(index)} src={url} alt={url} />
                            ))}
                            </div>
                            <span className={`material-icons-outlined cursor-pointer select-none ${product.images.length < 7 && "pointer-events-none opacity-50"}`} onClick={() => setImgIndexTransform((prev) =>  (prev + 1) * 84 > (product.images.length - 6) * 84 ? product.images.length - 6 :  prev + 1   )} >
                                arrow_forward_ios
                            </span>
                        </div>
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