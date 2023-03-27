import { IProductModel } from '@/models/Product';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { addToCart } from '@/slices/cartSlice';
interface IProps {
    product: IProductModel;
}
const ProductItem = ({ product }: IProps, ...props: any[]) => {
    const dispatch: AppDispatch = useDispatch();
    return (
        <div {...props}>
            <div className="card w-80 bg-base-100 shadow-xl">
                <figure><img className='object-cover w-80 h-80 2xl:w-64 2xl:h-64' src={product.images[0].url} alt={product.images[0].url} /></figure>
                <div className="card-body">
                    <h2 className="card-title capitalize">{product.title}</h2>
                    <div className='flex justify-between'>
                        <h6 className='text-error'>${product.price}</h6>
                        {
                            product.inStock > 0
                                ? <h6 className='text-error'>In Stock: {product.price}</h6>
                                : <h6 className='text-error'>Out Stock</h6>
                        }
                    </div>
                    <p>{product.description}</p>
                    <div className="card-actions justify-end">
                        <Link href={`/product/${product._id}`} className="btn btn-outline btn-accent">View</Link>
                        <button className="btn btn-primary" onClick={() => dispatch(addToCart({product}))}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
