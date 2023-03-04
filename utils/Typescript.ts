import { ChangeEvent, FormEvent } from "react";
import mongoose from "mongoose";

export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type IFormEvent = FormEvent<HTMLFormElement>;
