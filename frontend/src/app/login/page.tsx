"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { IServerResponseError } from "@/types/error-type";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import Cookie from "js-cookie";
import { toast } from "sonner";
import "animate.css";
import { useRouter } from "next/navigation";
import { IAuthContext, useAuth } from "@/context/authContext";
import { IUser } from "@/types/interfaces";

const SignUpForm = () => {
  // Form details
  const formDetails = {
    title: "Login to your account",
  };
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<IServerResponseError[]>([]);
  const {
    isAuth,
    loading: authLoading,
    setUser,
    setIsAuth,
    setIsVerified,
  } = useAuth() as Pick<
    IAuthContext,
    "isAuth" | "loading" | "setIsVerified" | "setIsAuth" | "setUser"
  >;
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.replace("/");
    }
  }, [isAuth, router]);

  // submit form
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError([]); // To empty error message before each submit
    setSuccessMessage(""); // To empty success message before each submit
    setLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_USER_SERVICE}/api/v1/user/login`;
      const { data } = await axios.post(url, {
        email,
        password,
      });

      const userData: IUser = data.data.user;
      setUser(userData);
      setIsAuth(true);
      setIsVerified(userData.verified);
      Cookie.set("login_token", data.data.token, {
        expires: 7,
      });
      router.replace("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        const code = error.response?.data?.error?.code || "unknown_error";
        const status = error.response?.status.toString() || "500";

        const message =
          error.response?.data?.error?.message ||
          error.message ||
          "Unknown error";
        setError([{ code, status, message }]);
      } else if (error instanceof Error) {
        setError([
          {
            code: "unknown_error",
            message: error.message,
          },
        ]);
      } else {
        setError([
          {
            code: "unknown_error",
            message: "Unknown error. Please try again later",
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-semibold tracking-tight">Reminder Mailer</h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <Card className="bg-card text-card-foreground border rounded-xl shadow-sm p-8 space-y-6 animate__animated animate__fadeIn">
          <CardHeader>
            <CardTitle className="text-xl mx-auto pb-2">
              {formDetails.title}
            </CardTitle>
            <CardDescription className="mx-auto">
              Don&apos;t have an account?{" "}
              <span className="underline">
                <Link href="/register">Register</Link>
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Enter Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your username"
                  value={email}
                  className="pl-4"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Enter Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  className="pl-4"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error?.length > 0 && (
                <div
                  role="alert"
                  className="mb-4 rounded-md border border-destructive/60 bg-destructive/20 px-4 py-3 text-sm text-destructive/90"
                >
                  <ul className="list-disc space-y-1 pl-5">
                    {error.map((e, i) => (
                      <li key={i}>{e.message}</li>
                    ))}
                  </ul>
                </div>
              )}
              {successMessage && (
                <div
                  role="status"
                  className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                  <p>{successMessage}</p>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Spinner />}
              {!loading && (
                <>
                  Login <ArrowRight />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
export default SignUpForm;
