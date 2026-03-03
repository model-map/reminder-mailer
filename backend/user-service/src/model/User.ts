import mongoose, { Schema, HydratedDocument } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  verified?: boolean; // TO-DO : IF USER HAS VERIFIED THEIR EMAIL
  createdAt?: Date;
  updatedAt?: Date;
}

export type IUserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUserDocument>("users", userSchema);
