import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { AuthProvider } from "@/context/authContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Reminder Mailer",
    template: "%s | Reminder Mailer",
  },
  description:
    "Automated reminder email tool for scheduling, tracking, and sending follow-up emails efficiently.",
  applicationName: "Reminder Mailer",
  keywords: [
    "reminder emails",
    "email automation",
    "follow-up emails",
    "scheduled emails",
    "productivity tool",
  ],
  authors: [{ name: "Reminder Mailer Team" }],
  creator: "Reminder Mailer",
  // metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Reminder Mailer",
    description:
      "Schedule and automate reminder emails to improve follow-ups and response rates.",
    // url: "https://yourdomain.com",
    siteName: "Reminder Mailer",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Reminder Mailer",
  //   description:
  //     "Automate and schedule reminder emails for better follow-ups.",
  // },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
    box-border
    m-0
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center" />
          <div className="min-h-screen w-full flex flex-col">
            <AuthProvider>
              <Header />
              <main className="flex flex-col flex-1">{children}</main>
            </AuthProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
