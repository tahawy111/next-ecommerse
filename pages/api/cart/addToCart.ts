import connectDB from "../../../utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "@/utils/globals";
import Cart from '@/models/Cart';
import User from '@/models/User';
import mongoose from "mongoose";

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

    const cart = await Cart.findById(req.body.userId);
    const user = await User.findById(req.body.userId);

    if (cart) {
      let indexOfProduct = -1;
      for (let i = 0; i < cart.cartItems.length; i++) {
        if (req.body.productId === cart.cartItems[i]._id) {
          indexOfProduct = i;
          break;
        }
      }

      // if i chosed the same product it's gonna update
      if (indexOfProduct >= 0) {
        cart.cartItems[indexOfProduct].quantity += 1;

        await Cart.findByIdAndUpdate(req.body.userId, { $set: cart });

        const cartItmes = await Cart.aggregate([
           {$unwind:"$cartItems"},
                {
                  $lookup: {
                    from: "products", // here you put the full collection name
                    let: { user_id: "$cartItems._id" },
                    pipeline: [
                      { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    ],
                    as: "user", // here you put the name of the input field
                  },
                },
  
                // array -> object
                { $unwind: "$user" },
              ]);

        console.log(cartItmes);
        return res.json({ cartItmes });
      }



    } else {

      const newCart = new Cart({ _id: req.body.userId, cartItems: [] });

      newCart.cartItems.push({ _id: req.body.productId, quantity: 1 });

      const savedCart = await newCart.save();

      res.json({ cart: savedCart });

    }



  } catch (error: any) {
    res.status(500).json({ msg: "Error occured Adding To Cart" });
  }
};
