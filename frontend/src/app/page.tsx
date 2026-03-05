"use client";

import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/authContext";
import log from "loglevel";

log.setLevel(process.env.NEXT_PUBLIC_ENV === "production" ? "warn" : "trace");
log.info("In Home Page");

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <div>User unauthenticated</div>;
  }

  return <div>User authenticated</div>;
}
