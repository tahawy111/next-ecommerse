import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/generateToken";
import { validEmail } from "@/utils/valid";
import { BASE_URL } from "@/utils/globals";

connectDB();

const CLIENT_URL = BASE_URL;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
  }
};

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Start of Checking
    const { email, password } = req.body;
    if (!validEmail(email))
      return res.status(403).json({ msg: "Invalid Email." });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "This user doesn't exist." });
    if (!bcrypt.compareSync(password, user.password))
      return res.status(403).json({ msg: "Incorrect password." });
    // End of Checking

    const access_token = generateAccessToken({ id: user._id });
    const refresh_token = generateRefreshToken({ id: user._id });

    res.json({
      msg: "Login Success!",
      refresh_token,
      access_token,
      user: {
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
    res.status(500).json({ msg: "Error occured Login" });
  }
};
