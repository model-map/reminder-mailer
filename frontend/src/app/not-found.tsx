import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="mx-auto max-w-xl text-center">
        {/* <p className="text-sm font-medium text-muted-foreground">404 error</p> */}

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          🤖 Page not found
        </h1>

        <p className="mt-4 text-base text-muted-foreground">
          The page you’re trying to access doesn’t exist or has been moved.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>

          {/* <Button variant="outline" asChild>
            <Link href="/">Contact support</Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
}
