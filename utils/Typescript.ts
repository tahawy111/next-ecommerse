import { ChangeEvent, FormEvent } from "react";
import mongoose from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type IFormEvent = FormEvent<HTMLFormElement>;

export interface IRefreshToken extends JwtPayload {
  id: string;
  iat: number;
  exp: number;
}
