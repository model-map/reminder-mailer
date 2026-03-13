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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "animate.css";
import { IAuthContext, useAuth } from "@/context/authContext";

const SignUpForm = () => {
  // Form details
  const formDetails = {
    title: "Create your account",
    description: "Enter your details to continue your journey",
  };
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IServerResponseError[]>([]);
  const { isAuth, loading: authLoading } = useAuth() as Pick<
    IAuthContext,
    "isAuth" | "loading"
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
    setLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_USER_SERVICE}/api/v1/user/signup`;
      const { data } = await axios.post(url, {
        username,
        email,
        password,
      });
      toast.success(data.message);
      router.replace(`/login/?email=${email}`);
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
            code: error.name,
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
        <Card className="text-card-foreground bg-card rounded-xl p-8 shadow-md space-y-6 animate__animated animate__fadeIn">
          <CardHeader>
            <CardTitle className="text-xl mx-auto pb-2">
              {formDetails.title}
            </CardTitle>
            <CardDescription className="mx-auto">
              Already have an account?{" "}
              <span className="underline">
                <Link href="/login">Login</Link>
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Set a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error?.length > 0 && (
                <div
                  role="alert"
                  className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  <ul className="list-disc pl-5 space-y-1">
                    {error.map((e, i) => (
                      <li key={i}>{e.message}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Spinner />}
              {!loading && (
                <>
                  Sign up <ArrowRight />
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
