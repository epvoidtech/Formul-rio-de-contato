import nodemailer from "nodemailer";

export function getTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: String(process.env.SMTP_SECURE) === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

export async function sendContactMail({ name, email, subject, message }) {
  const transporter = getTransport();
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  const to = process.env.MAIL_TO || process.env.SMTP_USER;

  return transporter.sendMail({
    from,
    to,
    subject: `Contato: ${subject}`,
    replyTo: `${name} <${email}>`,
    text: `Nome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\nMensagem:\n${message}`
  });
}
