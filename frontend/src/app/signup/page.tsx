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
import { ArrowRight } from "lucide-react";
import { useState } from "react";

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
  const [error, setError] = useState<{ error: string; message: string }[]>([]);

  // submit form
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError((prev) => [
      { error: "Whatever", message: "This is a test error message" },
    ]);
  };

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit}>
      <Card className="bg-card text-card-foreground border rounded-xl shadow-sm p-8 space-y-6">
        <CardHeader>
          <CardTitle className="text-xl mx-auto pb-2">
            {formDetails.title}
          </CardTitle>
          <CardDescription className="mx-auto">
            {formDetails.description}
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
      {error?.length > 0 && (
        <div
          role="alert"
          className="mb-4 rounded-md text-destructive px-4 py-3 text-sm"
        >
          <ul className="list-disc pl-5 space-y-1">
            {error.map((e, i) => (
              <li key={i}>{e.message}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};
export default SignUpForm;
