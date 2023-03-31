import connectDB from "../../../utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { IRefreshToken } from "@/utils/Typescript";
import { generateAccessToken } from "@/utils/generateToken";
import { getCookies } from "@/utils/getCookies";
import User from "@/models/User"

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = getCookies(
      req && req.headers.cookie ? req.headers.cookie : ""
    );
    const rf_token = cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ msg: "Please Login Now!" });

    const result = <IRefreshToken>(
      jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
    );
    if (!result)
      return res
        .status(400)
        .json({ msg: "Your token is incorrect or has expired." });

    const user = await User.findById(result.id);
    if (!user) return res.status(404).json({ msg: "This user doesn't exist." });

    const accessToken = generateAccessToken({ id: user._id });

    res.json({
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
