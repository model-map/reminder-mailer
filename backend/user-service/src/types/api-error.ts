type ApiErrorCode =
  | "invalid_credentials"
  | "credentials_required"
  | "password_required"
  | "unauthorized"
  | "forbidden";

export interface ApiError {
  error: ApiErrorCode;
  message: string;
}
