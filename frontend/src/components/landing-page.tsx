"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Clock, Bell } from "lucide-react";
import "animate.css";

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      {/* HERO */}
      <section className="container mx-auto px-6 py-24 text-center max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl animate__animated animate__fadeIn">
          Email reminders that actually reach you
        </h1>

        <p className="mt-6 text-lg text-muted-foreground animate__animated animate__fadeIn">
          Create reminders and receive them directly in your inbox at the exact
          time you choose. No apps to open, no notifications to miss.
        </p>

        <div className="mt-10 flex justify-center gap-4 animate__animated animate__fadeIn">
          <Link href="/register">
            <Button size="lg" className="hover:animate-pulse">
              Get Started
            </Button>
          </Link>

          <Link href="/login">
            <Button size="lg" variant="outline" className="hover:animate-pulse">
              Sign in
            </Button>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-6 pb-2 animate__animated animate__fadeIn animate__delay-1s">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Mail className="h-6 w-6 text-primary" />
              <h3 className="font-semibold text-lg">Email-based reminders</h3>
              <p className="text-sm text-muted-foreground">
                Get reminders delivered directly to your email so you never miss
                important tasks.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <Clock className="h-6 w-6 text-primary" />
              <h3 className="font-semibold text-lg">Schedule any time</h3>
              <p className="text-sm text-muted-foreground">
                Set reminders minutes, hours, or days in advance with precise
                scheduling.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <Bell className="h-6 w-6 text-primary" />
              <h3 className="font-semibold text-lg">Simple and reliable</h3>
              <p className="text-sm text-muted-foreground">
                Create reminders quickly without complex tools or unnecessary
                setup.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
