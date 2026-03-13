"use client";
import { Spinner } from "@/components/ui/spinner";
import { IAuthContext, useAuth } from "@/context/authContext";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "animate.css";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";

const VerifyEmailPage = () => {
  const { user, setUser, loading, isVerified } = useAuth() as Pick<
    IAuthContext,
    "user" | "setUser" | "loading" | "isVerified"
  >;
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [verifying, setVerifying] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // If no token is provided as searchParam
    if (!token) {
      router.replace("/");
      return;
    }

    //   If user is already verified
    if (isVerified) {
      router.replace("/");
    }
  }, [token, isVerified, router]);

  //   Validating token and verifying email
  useEffect(() => {
    async function verifyEmail() {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_USER_SERVICE}/api/v1/user/verify?token=${token}`,
        );
        setMessage(data.message);
        if (user) {
          toast.success(data.message);
          setUser(data.user);
          router.replace("/");
        }
        if (!user) {
          toast.success(data.message);
          router.replace("/login");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const message =
            error?.response?.data?.error?.message ||
            error.message ||
            "Unknown error";
          setError(message);
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(
            "Failed to verify email - Unknown error. Please try again later",
          );
        }
      } finally {
        setVerifying(false);
      }
    }
    verifyEmail();
  }, [token, setUser]);

  //   if (loading)
  //     return (
  //       <div className="min-h-screen flex items-center justify-center">
  //         <Spinner />
  //       </div>
  //     );

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-[420px] shadow-md">
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />

            <div className="space-y-1">
              <p className="font-semibold text-lg">Verifying your email</p>
              <p className="text-sm text-muted-foreground">
                Please wait while we confirm your email address.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[420px] shadow-md">
        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
          {message && (
            <>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div className="space-y-1">
                <p className="font-semibold text-lg">Email verified</p>
                <p className="text-sm text-muted-foreground">{message}</p>
              </div>
            </>
          )}

          {error && (
            <>
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="space-y-1">
                <p className="font-semibold text-lg">Verification failed</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default VerifyEmailPage;
