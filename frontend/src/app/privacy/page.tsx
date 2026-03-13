export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Last updated: {new Date().getFullYear()}
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            1. Information We Collect
          </h2>
          <p>
            Reminder Mailer collects information you provide when creating an
            account, including your email address and reminder data such as
            message content and scheduled times.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            2. How We Use Your Information
          </h2>
          <p>
            Your information is used solely to operate the service, including:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Sending scheduled reminder emails</li>
            <li>Managing your account and reminders</li>
            <li>Improving service reliability and performance</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            3. Email Communications
          </h2>
          <p>
            Reminder emails are sent only for reminders you create or for
            essential account-related notifications such as verification emails.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            4. Data Security
          </h2>
          <p>
            We take reasonable measures to protect your data from unauthorized
            access, disclosure, or misuse. However, no system can guarantee
            complete security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            5. Third-Party Services
          </h2>
          <p>
            Reminder Mailer may rely on third-party infrastructure providers
            (such as hosting or email delivery services) to operate the
            platform. These providers process data only as required to provide
            the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            6. Your Data
          </h2>
          <p>
            You may delete your reminders or account at any time. When an
            account is deleted, associated data is removed from the system
            within a reasonable period.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            7. Changes to This Policy
          </h2>
          <p>
            This privacy policy may be updated periodically. Changes will be
            reflected on this page with an updated revision date.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">8. Contact</h2>
          <p>
            For privacy-related questions, please contact the site
            administrator.
          </p>
        </section>
      </div>
    </main>
  );
}
