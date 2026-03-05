const clientUrl = process.env.CLIENT_SERVICE;

export const verificationMessage = (email: string, token: string) => {
  const appName = process.env.APPLICATION_NAME;
  const verifyUrl = `${clientUrl}/api/v1/verify?token=${token}`;

  return {
    to: email,
    subject: `${appName} – Verify your account`,
    text: `
Verify your ${appName} account.

Open this link to verify:
${verifyUrl}

This link expires in 24 hours.
`.trim(),

    html: `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f4;padding:40px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="520" style="background:#ffffff;border-radius:8px;padding:32px;">
            
            <tr>
              <td style="font-size:22px;font-weight:bold;padding-bottom:16px;">
                Verify your ${appName} account
              </td>
            </tr>

            <tr>
              <td style="font-size:14px;color:#444;padding-bottom:24px;">
                Click the button below to verify your email address.
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-bottom:24px;">
                <a href="${verifyUrl}"
                   style="background:#4f46e5;color:#ffffff;padding:12px 24px;
                          text-decoration:none;border-radius:6px;font-weight:bold;
                          display:inline-block;">
                  Verify Account
                </a>
              </td>
            </tr>

            <tr>
              <td style="font-size:13px;color:#666;padding-bottom:12px;">
                This link is valid for 24 hours.
              </td>
            </tr>

            <tr>
              <td style="font-size:12px;color:#999;">
                If the button doesn't work, copy this link into your browser:
                <br/>
                <a href="${verifyUrl}" style="color:#4f46e5;">${verifyUrl}</a>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
  `,
  };
};
