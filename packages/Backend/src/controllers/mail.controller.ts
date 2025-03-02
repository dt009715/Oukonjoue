import dotenv from "dotenv";
import { Request, Response } from "express";
import nodemailer from "nodemailer";

dotenv.config();

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // user mail
        pass: process.env.EMAIL_PASS, // user password
      },
    });

    // mail options
    const mailOptions = {
      from: email, // sending by
      to: "oukonjoue@gmail.com ",
      subject: `Nouveau message de ${name}`,
      text: message,
    };

    // email sent
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "E-mail envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur d'envoi de l'email:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'envoi de l'e-mail", error });
  }
};
