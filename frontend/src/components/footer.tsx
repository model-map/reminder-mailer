"use client";
import { IAuthContext, useAuth } from "@/context/authContext";
import Link from "next/link";

const Footer = () => {
  const { user } = useAuth() as Pick<IAuthContext, "user">;
  return (
    <footer className="border-t mt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Reminder Mailer</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Schedule reminders and receive them directly in your email at the
              exact time you choose.
            </p>
          </div>

          {/* Product */}
          {!user && (
            <div className="space-y-3">
              <h4 className="font-medium">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/register"
                    className="hover:text-foreground transition"
                  >
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-foreground transition"
                  >
                    Sign In
                  </Link>
                </li>
                {/* <li>
                <Link
                  href="/dashboard"
                  className="hover:text-foreground transition"
                >
                  Dashboard
                </Link>
              </li> */}
              </ul>
            </div>
          )}

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-medium">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-foreground transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-foreground transition"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t text-sm text-muted-foreground flex flex-col sm:flex-row justify-between gap-3">
          <p>
            © {new Date().getFullYear()} Reminder Mailer. All rights reserved.
          </p>
          <p>Built with ❤️ </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
