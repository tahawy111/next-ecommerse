import Layout from '@/components/Layout';
import { IProductModel } from '@/models/Product';
import { BASE_URL, capitalize } from '@/utils/globals';
import axios from 'axios';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, loggedInAddToCart } from '@/slices/cartSlice';
interface IProps {
    product: IProductModel;
}
const DetailProduct = ({ product }: IProps) => {
    const [imgIndex, setImgIndex] = useState(0);
    const [imgIndexTransform, setImgIndexTransform] = useState(0);
    const divImagesRef = useRef<HTMLImageElement>(null);
    const [imgsWidth, setImgsWidth] = useState<any>(null);
    const dispatch: AppDispatch = useDispatch();
    const { userInfo, isLoggedIn } = useSelector((state: RootState) => state.auth);


    const AddToCart = () => {
        if (isLoggedIn) {
            localStorage.removeItem("cartItems");
            dispatch(loggedInAddToCart({ productId: product._id, userId: userInfo?.user._id }));
        } else {
            dispatch(addToCart({ product }));
        }
    };

    return (
        <Layout>
            <Head>
                <title>{`Tahawy Shop - ${product.title.toUpperCase()}`}</title>
                <meta name="description" content="Product Page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className='grid grid-cols-1 gap-x-3 xl:grid-cols-2'>
                <div className="grid">

                    <div className={``}>
                        <img className='border border-[#ddd] rounded-lg p-1 w-full object-contain h-[520px]' src={product.images[imgIndex].url} alt={product.images[imgIndex].url} />
                        <div className={`flex m-3 items-center justify-center`}>
                            <span className={`material-icons-outlined cursor-pointer select-none ${product.images.length < 7 && "pointer-events-none opacity-50"}`} onClick={() => setImgIndexTransform((prev) => prev - 1)}>
                                arrow_back_ios
                            </span>
                            <div className={`flex overflow-hidden transition-transform duration-150 gap-x-3`}>
                                {product.images.map(({ url }, index) => (
                                    <img ref={divImagesRef} style={{ transform: `translateX(-${imgIndexTransform * 100}px)` }} key={index} className={`transition-transform duration-150 h-[80px] w-[80px] cursor-pointer object-cover border border-[#ddd] rounded-lg p-1 hover:border-[#79612d] dark:hover:border-[#e0ac3bcc] ${index === imgIndex ? "border-black dark:border-[#ddd]" : "dark:border-black"}`} onClick={() => setImgIndex(index)} src={url} alt={url} />
                                ))}
                            </div>
                            <span className={`material-icons-outlined cursor-pointer select-none ${product.images.length < 7 && "pointer-events-none opacity-50"}`} onClick={() => setImgIndexTransform((prev) => (prev + 1) * 84 > (product.images.length - 6) * 84 ? product.images.length - 6 : prev + 1)} >
                                arrow_forward_ios
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <h2 className='text-4xl uppercase font-semibold'>{product.title}</h2>
                    <h5 className='text-xl text-red-500 font-semibold'>${product.price}</h5>

                    <div className="mx-0 flex justify-between">
                        {
                            product.inStock > 0 ? <h5 className='text-xl text-red-500 font-semibold'>In Stock: {product.inStock}</h5> : <h5 className='text-xl text-red-500 font-semibold'>Out Stock</h5>
                        }

                        <h5 className='text-xl text-red-500 font-semibold'>In Stock: {product.sold}</h5>
                    </div>

                    <div className="my-3">{product.description}</div>
                    <div className="my-3">
                        {product.content}
                        {product.content}
                        {product.content}
                    </div>

                    <button className="btn px-10 my-3 text-xl" onClick={AddToCart}>BUY</button>


                </div>
            </div>

        </Layout>
    );
};

export default DetailProduct;

export async function getServerSideProps({ params: { id } }: { params: { id: string; }; }) {
    const { data } = await axios.get(`${BASE_URL}/api/product/${id}`);
    return {
        props: { product: data.product }, // will be passed to the page component as props
    };
}