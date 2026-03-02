import { Request, Response } from "express";

export const loginUser = async (req: Request, res: Response) => {
  const { email } = req.body as {
    email: string;
  };

  // If no email is provided
  if (!email || email.trim() === "") {
    return res.status(400).json({ message: "Email required" });
  }

  //   if emai

  return res.json({ message: `Your email is ${email}` });
};
