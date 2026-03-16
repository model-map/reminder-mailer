type ApiErrorCode =
  | "invalid_credentials"
  | "credentials_required"
  | "password_required"
  | "unauthorized"
  | "unauthenticated"
  | "internal_server_error"
  | "rate_limit_exceeded"
  | "resource_not_found";

export interface ApiError {
  code: ApiErrorCode;
  message: string;
}
