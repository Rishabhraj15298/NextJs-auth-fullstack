import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // update user with token and expiry
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          VerifyToken: hashedToken,
          VerifyTokenExpiry: Date.now() + 3600000, // 1 hour
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpiry: Date.now() + 3600000, // 1 hour
        },
      });
    }

    // setup email transporter (Ethereal - for testing)
    const transport = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "marcelo.cummings@ethereal.email",
        pass: "P43CQcWvCWNkrZ1kqG",
      },
    });

    // email content
    const mailOptions = {
      from: "Rishabh@rishabh", // sender name/email
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify your email"
          : "Reset your password",
      html: `
        <p>
          Click 
          <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
            here
          </a> 
          to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
        </p>
        <p>
          Or copy and paste the link below in your browser:<br />
          ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>
      `,
    };

    // send email
    const mailResponse = await transport.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", mailResponse.messageId);
    return mailResponse;
  } catch (error: any) {
    throw new Error("Error sending email: " + error.message);
  }
};
