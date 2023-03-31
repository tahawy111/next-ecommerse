import { Model, Schema, model, models } from "mongoose";
import { IProductModel } from '@/models/Product';

export interface ICartModel {
    _id: string;
    cartItems: {_id:string | IProductModel | any,quantity:number}[];
    // totalQuantity: number;
    // totalPrice: number;
}

type CartModel = Model<ICartModel, {}>;

const cartSchema = new Schema(
    {
        _id: { required: true, type: String },
        cartItems: { type: Array, required: true },
        // totalQuantity: { required: true, type: Number },
        // totalPrice: { required: true, type: Number },
    },
    { timestamps: true }
);

const Dataset: CartModel =
    models.cart || model("cart", cartSchema);

export default Dataset;
