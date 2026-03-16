import { HydratedDocument } from "mongoose";

export const statuses = ["scheduled", "completed", "cancelled"] as const;

export interface IReminder {
  title: string;
  description?: string;
  category?: string;
  userId: string; // reference to user instead, get user data via API call to user service
  notifyEmail?: boolean; // optional override channel
  status: (typeof statuses)[number];
  remindAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type IReminderDocument = HydratedDocument<IReminder>;
