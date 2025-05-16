
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
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Geist', 'Inter', sans-serif; background-color: #f8f5ff; color: #4a4a5e;">
  <!-- Preheader text (hidden) -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    Verify your email address to complete your ${appName} registration
  </div>
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td style="padding: 30px 0;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="background-color: #ffffff; border-radius: 0.5rem; overflow: hidden; box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.06), 1px 1px 2px 0px rgba(0, 0, 0, 0.06);">
          <!-- Full Width Logo -->
          <tr>
            <td style="padding: 0; text-align: center; background-color: #ffffff;">
              <!-- Full width logo image -->
              <img src="https://sjc.microlink.io/9Cd7v7sEKVPXUFMTUGYXyMPmgjTVAn0ZBudyaMuLhW9VW47qImoqzK4HTN_OWMtXXi--tT4NzW489Y2W_8sVow.jpeg" alt="NoName Note Logo" style="display: block; width: 100%; height: auto; margin: 0;" />
            </td>
          </tr>
          
          <!-- Header -->
          <tr>
            <td style="padding: 20px 40px 30px; background-color: #8a6ca8; color: #f8f5ff;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.01em;">${appName} Email Verification</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #4a4a5e;">Thank you for signing up to NoName Note. Please use the verification code below to complete your registration:</p>
              
              <!-- Verification Code Box -->
              <div style="background-color: #e8e0f5; border: 1px solid #d8d0e8; border-radius: 0.5rem; padding: 25px; margin: 30px 0; text-align: center; box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.03);">
                <p style="margin: 0 0 10px; font-size: 14px; color: #6c6c80;">Your verification code is:</p>
                <p style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 5px; color: #8a6ca8; font-family: 'Fira Code', 'Courier New', monospace;">
                  <!-- Replace with dynamic code -->
                  ${code}
                </p>
              </div>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #4a4a5e;">This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.</p>
              
              <div style="margin: 30px 0 0; padding: 15px; background-color: #e07f7f; border-radius: 0.5rem; box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.03);">
                <p style="margin: 0; font-size: 15px; line-height: 1.5; color: #ffffff; font-weight: 500;">For security reasons, please don't share this code with anyone.</p>
              </div>
              
              <p style="margin: 30px 0 0; font-size: 16px; line-height: 1.6; color: #4a4a5e;">Thank you,<br>The ${appName} Team</p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #e8e0f5; text-align: center; color: #4a4a5e; font-size: 14px; border-top: 1px solid #d8d0e8;">
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