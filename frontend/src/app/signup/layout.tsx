import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  robots: {
    index: false,
    follow: false,
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  // metadata
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Reminder Mailer
          </h1>
          {/* <p className="text-sm text-muted-foreground">Create your account</p> */}
        </div>

        {children}

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Reminder Mailer
        </p>
      </div>
    </div>
  );
};
export default Layout;
