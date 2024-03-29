import { IProductModel } from '@/models/Product';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { addToCart, loggedInAddToCart } from '@/slices/cartSlice';
interface IProps {
    product: IProductModel;
}
const ProductItem = ({ product }: IProps, ...props: any[]) => {
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
        <div {...props}>
            <div className="card w-80 bg-base-100 shadow-xl">
                <figure><img className='object-cover w-80 h-80 2xl:w-64 2xl:h-64' src={product.images[0].url} alt={product.images[0].url} /></figure>
                <div className="card-body">
                    <h2 className="card-title capitalize">{product.title}</h2>
                    <div className='flex justify-between'>
                        <h6 className='text-error'>${product.price}</h6>
                        {
                            product.inStock > 0
                                ? <h6 className='text-error'>In Stock: {product.inStock}</h6>
                                : <h6 className='text-error'>Out Stock</h6>
                        }
                    </div>
                    <p>{product.description}</p>
                    <div className="card-actions justify-end">
                        <Link href={`/product/${product._id}`} className="btn btn-outline btn-accent">View</Link>
                        <button className="btn btn-primary" onClick={AddToCart}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
