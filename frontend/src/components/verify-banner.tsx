"use client";

import axios, { AxiosError } from "axios";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { IAuthContext, useAuth } from "@/context/authContext";

const handleClick = async (email: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_SERVICE}/api/v1/user/verify/resendMail`,
      {
        email,
      },
    );
    toast.success(data.message);
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status || "500";
      const code = error?.response?.data?.error?.code || "unknown_error";
      const message =
        error?.response?.data?.error?.message ||
        error.message ||
        "Unknown error";
      toast.error(`Failed to resend verification email: ${message}`);
    } else if (error instanceof Error) {
      toast.error(`Failed to resend verification email: ${error.message}`);
    } else {
      toast.error(`Failed to send verification email: Unknown error`);
    }
  }
};

const VerifyBanner = () => {
  const { user } = useAuth() as Pick<IAuthContext, "user">;

  if (!user) return;

  return (
    <div className="w-full border-b bg-destructive/10">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-center px-6 text-sm">
        <span>Your account is not verified</span>
        <Button
          className="font-medium underline underline-offset-4 hover:opacity-80"
          variant="ghost"
          onClick={() => handleClick(user.email)}
        >
          Resend verification email
        </Button>
      </div>
    </div>
  );
};

export default VerifyBanner;
