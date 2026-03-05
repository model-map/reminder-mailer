type ApiErrorCode =
  | "invalid_credentials"
  | "credentials_required"
  | "password_required"
  | "unauthorized"
  | "unauthenticated"
  | "internal_server_error"
  | "rate_limit_exceeded";

export interface ApiError {
  code: ApiErrorCode;
  message: string;
}
