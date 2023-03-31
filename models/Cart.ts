import { Model, Schema, model, models } from "mongoose";
import { IProductModel } from '@/models/Product';

export interface ICartModel {
    _id: string;
    cartItems: { _id: string ; quantity: number; }[];
    // totalQuantity: number;
    // totalPrice: number;
}

type CartModel = Model<ICartModel, {}>;

const cartSchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, required: true },
        cartItems: [{ _id: { type: Schema.Types.ObjectId, required: true }, quantity: { type: Number, required: true } }],
        // totalQuantity: { required: true, type: Number },
        // totalPrice: { required: true, type: Number },
    },
    { timestamps: true }
);

const Dataset: CartModel =
    models.cart || model("cart", cartSchema);

export default Dataset;
