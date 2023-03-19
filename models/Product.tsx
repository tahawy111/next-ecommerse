import { Model, Schema, model, models } from "mongoose";

export interface IProductModel {
  _id:string;
  title: string;
  price: number;
  description: string;
  content: string;
  images: {public_id:string,url:string}[];
  category:string;
  checked: boolean;
  inStock: number;
  sold: number;
}

type ProductModel = Model<IProductModel, {}>;

const productSchema = new Schema/* <IProductModel, ProductModel> */(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    images: { type: Array, required: true },
    category: { type: String, required: true },
    checked: { type: Boolean, default:false },
    inStock: { type: Number, default:0 },
    sold: { type: Number, default:0 },
  },
  { timestamps: true }
);

const Dataset: ProductModel =
  models.product || model("product", productSchema);

export default Dataset;
