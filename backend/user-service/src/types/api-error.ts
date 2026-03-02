type ApiErrorCode =
  | "invalid_credentials"
  | "email_required"
  | "password_required"
  | "unauthorized"
  | "forbidden";

export interface ApiError {
  error: ApiErrorCode;
  message: string;
}
