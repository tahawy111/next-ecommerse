import connectDB from "../../../utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "@/utils/globals";
import Cart from '@/models/Cart';

connectDB();

const CLIENT_URL = BASE_URL;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await addToCart(req, res);
      break;
  }
};

const addToCart = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    // const cart = Cart.findById(req.body.userId)


    const newCart = new Cart({ _id: req.body.userId, cartItems: [] });

    newCart.cartItems.push(req.body.productId);

    const savedCart = await newCart.save();

    res.json({ cart: savedCart });

  } catch (error: any) {
    res.status(500).json({ msg: "Error occured Adding To Cart" });
  }
};
