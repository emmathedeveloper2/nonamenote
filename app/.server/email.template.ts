
type VerificationTemplateOptions = {
    appName: string,
    code: string
}

export const verificationEmailTemplate = ({ appName , code } : VerificationTemplateOptions) => {

    return `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', sans-serif; background-color: #f9e8f0; color: #333333;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td style="padding: 30px 0;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="background-color: #ffffff; border-radius: 0.5rem; overflow: hidden; box-shadow: 3px 3px 0px 0px rgba(214, 77, 124, 0.5);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px 40px; background-color: #d64d7c; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.025em;">${appName} Email Verification</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">Thank you for signing up. Please use the verification code below to complete your registration:</p>
              
              <!-- Verification Code Box -->
              <div style="background-color: #faf5e0; border: 2px solid #d64d7c; border-radius: 0.5rem; padding: 25px; margin: 30px 0; text-align: center; box-shadow: 3px 3px 0px 0px rgba(214, 77, 124, 1.00);">
                <p style="margin: 0 0 10px; font-size: 14px; color: #666666;">Your verification code is:</p>
                <p style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 5px; color: #d64d7c; font-family: 'Fira Code', monospace;">
                  ${code}
                </p>
              </div>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.</p>
              
              <div style="margin: 30px 0 0; padding: 15px; background-color: #a0d8e9; border-radius: 0.5rem; border-left: 4px solid #d64d7c;">
                <p style="margin: 0; font-size: 15px; line-height: 1.5; color: #333333;">For security reasons, please don't share this code with anyone.</p>
              </div>
              
              <p style="margin: 30px 0 0; font-size: 16px; line-height: 1.6; color: #333333;">Thank you,<br>The ${appName} Team</p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f8e8c0; text-align: center; color: #333333; font-size: 14px; border-top: 1px solid #d64d7c;">
              <p style="margin: 0;">© 2025 ${appName}. All rights reserved.</p>
              <p style="margin: 10px 0 0;">This is an automated message, please do not reply.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `
}