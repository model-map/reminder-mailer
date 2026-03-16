import mongoose, { Schema } from "mongoose";
import { IReminderDocument, statuses } from "../types/reminder.types.js";

const reminderSchema = new Schema<IReminderDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "uncategorised",
    },
    notifyEmail: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: statuses,
    },
  },
  { timestamps: true },
);

export const Reminders = mongoose.model<IReminderDocument>(
  "reminders",
  reminderSchema,
);
