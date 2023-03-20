import connectDB from "../../../utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import Product from "@/models/Product";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            await getProduct(req, res);
            break;
    }
};

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const product = await Product.findById(req.query.id);
        if(!product) return res.status(500).json({ err: "This product does not exist." })
        res.json({ product })
    } catch (error: any) {
        res.status(500).json({ err: error.message })
    }
};
