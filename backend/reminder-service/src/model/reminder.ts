import mongoose, { HydratedDocument, Schema } from "mongoose";

export interface IReminder {
  title: string;
  description?: string;
  userId: string; // reference to user instead, get user data via API call to user service
  notifyEmail?: boolean; // optional override channel
  status: "scheduled" | "completed" | "cancelled";
  remindAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type IReminderDocument = HydratedDocument<IReminder>;

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
    notifyEmail: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
    },
  },
  { timestamps: true },
);

export const Reminders = mongoose.model<IReminderDocument>(
  "reminders",
  reminderSchema,
);
