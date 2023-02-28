import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

connectDB();

const CLIENT_URL = `${process.env.BASE_URL}`;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await active(req, res);
      break;
  }
};

const active = async (req: NextApiRequest, res: NextApiResponse) => {
  // const newUser = new User({ name, email, password: passwordHash });

  // await newUser.save();

  console.log("in");

  try {
    const { token } = req.body;
    console.log("token", token);
    if (!token) return res.status(403).json({ msg: "Please add your token!" });
    const decoded: any = jwt.verify(
      token,
      `${process.env.ACTIVE_TOKEN_SECRET}`
    );
    const { newUser } = decoded;
    if (!newUser)
      return res.status(400).json({ msg: "Invalid authentication" });

    const user = new User(newUser);
    await user.save();

    return res.status(201).json({ msg: "Account has been activated!" });
  } catch (error: any) {
    if (error.code === 11000)
      return res.status(403).json({ msg: "Account is already exist!" });
    if (error.name === "TokenExpiredError")
      return res
        .status(403)
        .json({ msg: "Your activation is expired please try again!" });
  }
};
