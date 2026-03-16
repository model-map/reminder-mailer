// -----------------------------------------------------------

import { NextFunction, Request, Response } from "express";
import TryCatch from "../utils/TryCatch.js";
import { ApiError } from "../types/api-error.js";
import { IUser } from "../types/user.types.js";
import axios from "axios";
import { IReminder, Reminders } from "../models/reminder.js";
import { statuses } from "../types/reminder.types.js";
import { isFutureDate } from "../validators/reminder.validator.js";

// CONTROLLER FOR CREATING A REMINDER
export const createReminder = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      title,
      description,
      category,
      userId,
      notifyEmail,
      status,
      remindAt,
    } = req.body ?? {};

    // Check if all the required fields exist

    if (!title || !userId || !status || !remindAt) {
      const err: ApiError = {
        code: "invalid_reminder_data",
        message:
          "The following fields are required: title, userId, status, remindAt",
      };
      return res.status(400).json({
        error: err,
      });
    }

    // Check if userId is valid by fetching user data from user service
    let user: IUser | null;
    try {
      const { data } = await axios.get<{
        data: { user: IUser };
        message: string;
      }>(`${process.env.USER_SERVICE}/api/v1/user/get/${userId}`);

      user = data.data.user;
    } catch (err) {
      let message = "Unknown error";

      if (axios.isAxiosError(err)) {
        message =
          err.response?.data?.error?.message ||
          err.message ||
          "User service request failed";

        return res.status(502).json({
          message: `Failed to create reminder - user lookup failed: ${message}`,
        });
      }

      if (err instanceof Error) {
        message = err.message;
      }

      return res.status(500).json({
        message: `Failed to create reminder - user lookup failed: ${message}`,
      });
    }

    // Checking if status is valid
    if (!statuses.includes(status)) {
      const err: ApiError = {
        code: "invalid_reminder_data",
        message: `Status should be one of ${statuses}`,
      };
      return res.status(400).json(err);
    }

    // Checking if remindAt is a date and a future date
    if (!isFutureDate(remindAt)) {
      const err: ApiError = {
        code: "invalid_reminder_data",
        message: "remindAt must be a valid future date.",
      };
      return res.status(400).json(err);
    }

    // Create a reminder
    const reminder = await Reminders.create({
      title,
      description,
      category,
      userId,
      notifyEmail,
      status,
      remindAt,
    });

    res.json({ data: { reminder }, message: `Successfully created reminder` });
  },
);
