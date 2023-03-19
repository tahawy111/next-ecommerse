import  { Model,Schema,model,models } from "mongoose";

export interface IUserModel {
  name: string;
  email: string;
  password: string;
  role: string;
  root: boolean;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

type UserModel = Model<IUserModel, {}>;

const userSchema = new Schema<IUserModel, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    root: { type: Boolean, default: false },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
  },
  { timestamps: true }
);

const Dataset: UserModel =
  models.user || model("user", userSchema);

export default Dataset;
