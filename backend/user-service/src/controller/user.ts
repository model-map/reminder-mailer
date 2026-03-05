import { Request, Response } from "express";
import validator from "validator";
import { ApiError } from "../types/api-error.js";
import { IUserDocument, User } from "../model/User.js";
import {
  decodeVerificationToken,
  generateLoginToken,
  generateVerificationToken,
} from "../utils/jwtUtils.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import TryCatch from "../utils/TryCatch.js";
import { AuthenticatedRequest } from "../middleware/isAuth.js";
import { publishToQueue } from "../config/rabbitmq.js";
import dotenv from "dotenv";
import { redisClient } from "../config/redis.js";
import { verificationMessage } from "../utils/mailUtils.js";
dotenv.config();

// -----------------------------------------------------------
// CONTROLLER FOR USER SIGN UP
export const signUp = TryCatch(async (req: Request, res: Response) => {
  let username: string = req.body?.username?.trim()?.toLowerCase() || "";
  const email: string = req.body?.email?.trim()?.toLowerCase() || "";
  const password: string = req.body?.password?.trim() || "";

  //   VALIDATION

  // If no email is provided
  if (!email || !username || !password) {
    const err: ApiError = {
      code: "credentials_required",
      message: "Username, Email, Password required",
    };
    return res.status(400).json({ error: err });
  }

  //   If username isn't between 4-10 chars
  if (username.length < 4 || username.length > 10) {
    const err: ApiError = {
      code: "invalid_credentials",
      message: "Username should be between 4 and 10 characters",
    };
    return res.status(400).json({ error: err });
  }

  // If username isn't alphanumeric
  if (!validator.isAlphanumeric(username)) {
    const err: ApiError = {
      code: "invalid_credentials",
      message: "Username can only contain alphabets and numbers",
    };
    return res.status(400).json({ error: err });
  }

  //   convert username to lowercase
  username = username.toLowerCase();

  // if username already exists in database
  const userWithUsername = await User.findOne({ username });
  if (userWithUsername) {
    const err: ApiError = {
      code: "invalid_credentials",
      message: `User with username ${username} already exists. Please choose another`,
    };
    return res.status(400).json({ error: err });
  }

  // if email is not a valid email
  if (!validator.isEmail(email)) {
    const err: ApiError = {
      code: "invalid_credentials",
      message: "Invalid email",
    };
    return res.status(400).json({ error: err });
  }

  // if email already exists in database
  const userWithEmail = await User.findOne({ email });
  if (userWithEmail) {
    const err: ApiError = {
      code: "invalid_credentials",
      message: `User with email ${email} already exists. Please choose another`,
    };
    return res.status(400).json({ error: err });
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
      code: "invalid_credentials",
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.",
    };
    return res.status(400).json({ error: err });
  }

  // AFTER SUCCESSFUL VALIDATION
  // Save user in DB
  const hashedPassword = await hashPassword(password);
  const user = await User.create({ username, email, password: hashedPassword });

  // Generate token, and store it as valid in redis
  const token = generateVerificationToken(user._id.toString());
  const redis_verification_token = `verification_email:${user.id}`;
  await redisClient.set(redis_verification_token, token, {
    expiration: {
      type: "EX",
      value: 24 * 60 * 60,
    },
  });
  //   Remove unnecessary info from user
  const { password: _password, __v, ...userWithoutPassword } = user.toObject();

  //   Sending verification token to RabbitMQ's `send-verification-mail` queue
  const msg = verificationMessage(email, token);
  await publishToQueue("send-verification-mail", msg);

  return res.status(201).json({
    message: `Account created successfully. Please check your email to verify your account.`,
  });
});

// -----------------------------------------------------------
// CONTROLLER FOR VERIFYING USER
export const verifyUser = TryCatch(async (req: Request, res: Response) => {
  const token = (req.query?.token as string) || "";
  // if no token is provided
  if (!token) {
    const err: ApiError = {
      code: "unauthenticated",
      message: "No verification token provided",
    };
    return res.status(400).json({ error: err });
  }

  // Check if verification token is valid
  // If valid - decode it, get userId, and set `verified` property to true
  const decodedToken = decodeVerificationToken(token);
  // If verification token fails to verify
  if (!decodedToken) {
    const err: ApiError = {
      code: "unauthenticated",
      message: "Invalid or expired verification token",
    };
    return res.status(400).json({ error: err });
  }

  const userId = decodedToken.userId;
  const redis_verification_token = `verification_email:${userId}`;
  // Checking if token is valid
  const validVerificationToken = await redisClient.get(
    redis_verification_token,
  );
  if (validVerificationToken !== token) {
    const err: ApiError = {
      code: "unauthenticated",
      message: "Invalid or expired verification token",
    };
    return res.status(400).json({ error: err });
  }

  // If token is valid, search for user using the userId
  const user = await User.findById(userId);
  if (!user) {
    const err: ApiError = {
      code: "unauthenticated",
      message: "Invalid or expired verification token",
    };
    return res.status(401).json({ error: err });
  }

  user.verified = true;
  await user.save();

  // deleting token from redis - one time use only
  await redisClient.del(redis_verification_token);

  const { password, __v, ...userWithoutPassword } = user.toObject();

  return res.json({
    message: `User successfully verified. Please Login`,
    data: {
      user: userWithoutPassword,
    },
  });
});

// -----------------------------------------------------------
//CONTROLLER FOR RESENDING VERIFICATION MAIL
export const resendVerificationMail = TryCatch(
  async (req: Request, res: Response) => {
    const email = req.body?.email?.trim()?.toLowerCase() || "";

    // if no username or email is provided
    if (!email) {
      const err: ApiError = {
        code: "credentials_required",
        message: `Email required`,
      };
      return res.status(401).json({ error: err });
    }

    // Rate limiting on sending email
    const rateLimitKey = `rateLimit:verification:${email}`;
    if (await redisClient.get(rateLimitKey)) {
      const err: ApiError = {
        code: "rate_limit_exceeded",
        message: "Too many request. Please try again later",
      };
      return res.status(429).json({ error: err });
    }

    const user = await User.findOne({ email });
    if (!user) {
      const err: ApiError = {
        code: "invalid_credentials",
        message: "No user with provided email exists. Please create an account",
      };
      return res.status(400).json({ error: err });
    }

    // If user is already verified
    if (user.verified) {
      return res.json({ message: "User is already verified. Please login" });
    }

    const newVerificationToken = generateVerificationToken(user._id.toString());
    // Set valid verification token as the newly generated token
    const redis_verification_token = `verification_email:${user._id}`;
    await redisClient.set(redis_verification_token, newVerificationToken, {
      expiration: {
        type: "EX",
        value: 24 * 60 * 60, //verification token valid for a day
      },
    });

    //   Sending verification token to RabbitMQ's `send-verification-mail` queue
    const msg = verificationMessage(email, newVerificationToken);
    await publishToQueue("send-verification-mail", msg);

    // Set 60s rate limit
    await redisClient.set(rateLimitKey, "true", {
      expiration: {
        type: "EX",
        value: 60,
      },
    });

    // send user without sensitive info in response
    const {
      password: _password,
      __v,
      ...userWithoutPassword
    } = user.toObject();

    return res.status(201).json({
      message: "Please check your mail for verification mail",
      user: userWithoutPassword,
      token: newVerificationToken,
    });
  },
);

// -----------------------------------------------------------
// CONTROLLER FOR LOGGING USER
export const login = TryCatch(async (req: Request, res: Response) => {
  const email = req.body?.email?.trim()?.toLowerCase() || "";
  const password = req.body?.password?.trim() || "";

  // if no email is provided
  if (!email || !password) {
    const err: ApiError = {
      code: "credentials_required",
      message: `Username and Password required`,
    };
    return res.status(401).json({ error: err });
  }

  // if email is not a valid email
  if (!validator.isEmail(email)) {
    const err: ApiError = {
      code: "invalid_credentials",
      message: "Invalid email or password",
    };
    return res.status(400).json({ error: err });
  }

  let user = await User.findOne({ email: email });

  //   if user does not exist in DB
  if (!user) {
    const err: ApiError = {
      code: "invalid_credentials",
      message: "Invalid email or password",
    };
    return res.status(401).json({ error: err });
  }

  // Comparing hashed password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    const err: ApiError = {
      code: "invalid_credentials",
      message: "Invalid email or password",
    };
    return res.status(401).json({ error: err });
  }

  // Generate token
  const token = generateLoginToken(user._id.toString());
  const { password: _password, __v, ...userWithoutPassword } = user.toObject();

  res.json({
    message: "User successfully logged in",
    data: {
      user: userWithoutPassword,
      token,
    },
  });
});

// -----------------------------------------------------------
// CONTROLLER TO FETCH USER
export const getUser = TryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    // If no user
    if (!user) {
      const err: ApiError = {
        code: "unauthenticated",
        message: `Authentication failed. Please login`,
      };
      return res.status(400).json({ error: err });
    }

    return res.json({ data: { user }, message: "user fetched successfully" });
  },
);
