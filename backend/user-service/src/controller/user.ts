import { Request, Response } from "express";
import validator from "validator";
import { ApiError } from "../types/api-error.js";
import { IUser, User } from "../model/User.js";
import generateToken from "../utils/generateToken.js";
import { hashPassword } from "../utils/passwordUtils.js";

export const signUp = async (req: Request, res: Response) => {
  let username: string = req.body?.username?.trim()?.toLowerCase() || "";
  const email: string = req.body?.email?.trim()?.toLowerCase() || "";
  const password: string = req.body?.password?.trim() || "";

  //   VALIDATION

  // If no email is provided
  if (!email || !username || !password) {
    const err: ApiError = {
      error: "credentials_required",
      message: "Username, Email, Password required",
    };
    return res.status(400).json(err);
  }

  //   If username isn't between 4-10 chars
  if (username.length < 4 || username.length > 10) {
    const err: ApiError = {
      error: "invalid_credentials",
      message: "Username should be between 4 and 10 characters",
    };
    return res.status(400).json(err);
  }

  // If username isn't alphanumeric
  if (!validator.isAlphanumeric(username)) {
    const err: ApiError = {
      error: "invalid_credentials",
      message: "Username can only contain alphabets and numbers",
    };
    return res.status(400).json(err);
  }

  //   convert username to lowercase
  username = username.toLowerCase();

  // if username already exists in database
  const userWithUsername = await User.findOne({ username });
  if (userWithUsername) {
    const err: ApiError = {
      error: "invalid_credentials",
      message: `User with username ${username} already exists. Please choose another`,
    };
    return res.status(400).json(err);
  }

  // if email is not a valid email
  if (!validator.isEmail(email)) {
    const err: ApiError = {
      error: "invalid_credentials",
      message: "Invalid email",
    };
    return res.status(400).json(err);
  }

  // if email already exists in database
  const userWithEmail = await User.findOne({ email });
  if (userWithEmail) {
    const err: ApiError = {
      error: "invalid_credentials",
      message: `User with email ${email} already exists. Please choose another`,
    };
    return res.status(400).json(err);
  }

  //   If password isn't only alphanumeric
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    })
  ) {
    const err: ApiError = {
      error: "invalid_credentials",
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.",
    };
    return res.status(400).json(err);
  }

  // AFTER SUCCESSFUL VALIDATION
  // Save user in DB
  const hashedPassword = await hashPassword(password);
  const user = await User.create({ username, email, password: hashedPassword });

  // Generate token
  const token = generateToken(user);

  //   Remove unnecessary info from user
  const { password: _password, __v, ...userWithoutPassword } = user.toObject();

  return res.status(201).json({
    message: "User successfully signed up",
    user: userWithoutPassword,
    token,
  });
};
