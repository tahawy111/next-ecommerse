import connectDB from "../../../utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Product from "@/models/Product";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
  }
};

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const products = await Product.find();
    res.json({ status: "success", result: products.length, products })
  } catch (error: any) {
    res.status(500).json({ err: error.message })
  }
};
