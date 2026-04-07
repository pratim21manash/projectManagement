import Mailgen from "mailgen";
import mailgen from "mailgen";

const sendEmail = async (options) => {
  const mailgenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Project management",
      link: "https://taskmanagelink.com",
    },
  });

  //email in text format
  const emailText = mailgenerator.generatePlaintext(options.mailgenContent);

  //email in HTML format
  const emailHTML = mailgenerator.generate(options.mailgenContent);

  // creating transporter for sending image
  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  //sending email defining email option
  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHTML,
  };

  //sending email
  try {
    await transporter.sendEmail(mail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

//Email verification mailGent content
const emailVerificationMailgenContent = (username, verificationURL) => {
  return {
    body: {
      name: "John Appleseed",
      intro: "Welcome to our App! We\re very excited to have you on board.",
      action: {
        instructions:
          "Plesae click the following button to verify your account",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

//Forget password mailgent content
const fogetPasswordMailgenContent = (username, verificationURL) => {
  return {
    body: {
      name: "John Appleseed",
      intro: "Welcome to our App! We\re very excited to have you on board.",
      action: {
        instructions:
          "Plesae click the following button to verify your account",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset your password",
          link: passwordResetURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export { emailVerificationMailgenContent, fogetPasswordMailgenContent };
