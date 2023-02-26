import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email }))
      return res.status(403).json({ msg: "User is already exsits." });

    const passwordHash = bcrypt.hashSync(password, 12);
    const newUser = new User({ name, email, password: passwordHash });

    await newUser.save();

    res.status(201).json({ msg: "Register Success!" });
  } catch (error) {}
};
