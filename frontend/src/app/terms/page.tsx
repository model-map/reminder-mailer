export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Last updated: {new Date().getFullYear()}
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Reminder Mailer, you agree to comply with
            these Terms of Service. If you do not agree with these terms, you
            should not use the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            2. Description of Service
          </h2>
          <p>
            Reminder Mailer allows users to create scheduled reminders that are
            delivered via email at specified times.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            3. User Accounts
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You must provide a valid email address.</li>
            <li>
              You are responsible for maintaining the security of your account.
            </li>
            <li>
              You are responsible for activities performed under your account.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            4. Acceptable Use
          </h2>
          <p>You agree not to use the service to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Send spam or abusive messages</li>
            <li>Violate applicable laws or regulations</li>
            <li>Attempt to disrupt or compromise the platform</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            5. Service Availability
          </h2>
          <p>
            While we aim to provide reliable reminder delivery, the service is
            provided on an “as is” basis. We do not guarantee uninterrupted
            operation or delivery timing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            6. Limitation of Liability
          </h2>
          <p>
            Reminder Mailer is not liable for missed reminders, delayed emails,
            or any indirect damages resulting from use of the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            7. Account Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these terms or abuse the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            8. Changes to These Terms
          </h2>
          <p>
            These terms may be updated from time to time. Continued use of the
            service after changes indicates acceptance of the revised terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">9. Contact</h2>
          <p>
            If you have questions regarding these terms, contact the site
            administrator.
          </p>
        </section>
      </div>
    </main>
  );
}
