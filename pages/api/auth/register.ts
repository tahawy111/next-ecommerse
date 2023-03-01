import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { generateActiveToken } from "@/utils/generateToken";
import { validEmail } from "@/utils/valid";
import sendMail from "@/utils/sendMail";

connectDB();

const CLIENT_URL = `${process.env.BASE_URL}`;

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
    // const newUser = new User({ name, email, password: passwordHash });

    // await newUser.save();

    const newUser = { name, email, password: passwordHash };
    const active_token = generateActiveToken({ newUser });
    const url = `${CLIENT_URL}/active/${active_token}`;
    const SENDER_MAIL = `${process.env.SENDER_EMAIL}`;
    const txt = "Verify Your Email Address";
    const mailOptions = {
      from: `"Tahawy Shop Verify Email" <${SENDER_MAIL}>`,
      to: email,
      subject: "Tahawy Shop",
      html: `<div style="max-width: 700px; margin:auto; border-top: 3px solid #d4dadf;border-bottom: 3px solid #d4dadf; padding: 50px 20px; font-size: 110%;font-family:'Cairo', sans-serif;border-radius:20px;">
        <!--  Font  -->
          <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900;1000&display=swap" rel="stylesheet">
        <!--  Font  -->
          
                      <h2 style="text-align: center; text-transform: uppercase;color: #1C99E8;">Welcome to the Tahawy Shop Website.</h2>
          <p>Congratulations! You're almost set to start using <a href="${CLIENT_URL}" target="_blank" rel="noopener noreferrer">Tahawy Shop.</a>
                          Just click the button below to activate your email address!
                      </p>
                      
                      <a href=${url} style="background: #CC0605;border-radius:10px; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: block;width: fit-content;margin-left: auto;margin-right: auto;">${txt}</a>
                  
                      <p>If the button doesn't work for any reason, you can also click on the link below:</p>
                  
                      <div>${url}</div>
                      </div>`,
    };

    if (validEmail(email)) {
      await sendMail(mailOptions);
      //     const savedUser = await newUser.save();
      return res.status(200).json({
        msg: "Register success. Please Check Your Email",
        data: newUser,
        active_token,
      });
    }
  } catch (error: any) {
    res.status(500).json({ msg: "Error occured Register" });
  }
};
