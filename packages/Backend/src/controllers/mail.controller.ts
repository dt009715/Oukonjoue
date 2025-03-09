import dotenv from "dotenv";
import { Request, Response } from "express";
import nodemailer from "nodemailer";

dotenv.config();

export const sendEmail = async (req: Request, res: Response) => {
  const { name, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: "touchard.diego@gmail.com",
    subject: subject,
    text: `Nom: ${name}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "E-mail envoyé !" });
  } catch (error) {
    console.error("Erreur d'envoi de l'e-mail :", error);
    res
      .status(500)
      .json({ success: false, message: "Échec de l'envoi de l'e-mail." });
  }
};
