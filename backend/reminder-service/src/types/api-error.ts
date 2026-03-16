type ApiErrorCode =
  | "reminder_not_found"
  | "invalid_reminder_data"
  | "invalid_remind_time"
  | "reminder_already_completed"
  | "reminder_cancelled"
  | "duplicate_reminder"
  | "rate_limit_exceeded"
  | "service_unavailable"
  | "internal_server_error"
  | "resource_not_found";

export interface ApiError {
  code: ApiErrorCode;
  message: string;
}
