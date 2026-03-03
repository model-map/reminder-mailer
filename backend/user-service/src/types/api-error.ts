type ApiErrorCode =
  | "invalid_credentials"
  | "credentials_required"
  | "password_required"
  | "unauthorized"
  | "unauthenticated"
  | "internal_server_error";

export interface ApiError {
  error: ApiErrorCode;
  message: string;
}
