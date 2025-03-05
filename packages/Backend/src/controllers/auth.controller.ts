import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

import prisma from "../config/database";
import { registerUser } from "../models/UserModel";
import { APIResponse, logger } from "../utils";

dotenv.config();
const bcrypt = require("bcrypt");

const { NODE_ENV, JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas défini. Vérifie ton fichier .env !");
}

export const register = async (request: Request, response: Response) => {
  const validationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(3),
    image: z.string().optional(),
    title: z.string().optional(),
    phone: z.string().optional(),
    mail: z.string().optional(),
    address: z.string().optional(),
    genre: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(["ARTISTS", "INSTITUTIONS"]),
  });

  try {
    const data = validationSchema.parse(request.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }, // Recherche un utilisateur avec cet email
    });

    if (existingUser) {
      return APIResponse(response, null, "Cet email est déjà utilisé", 400);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await registerUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      image: data.image || "default.jpg",
      phone: data.phone || "Non disponible",
      mail: data.mail || "Non disponible",
      address: data.address || "Adresse inconnue",
      description: data.description || "Aucune description",
      role: data.type,
    });

    return APIResponse(response, null, "Vous êtes inscrit avec succès", 200);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return APIResponse(
        response,
        err.errors,
        "Le formulaire est invalide",
        400
      );
    }

    logger.error(
      `Erreur lors de l'inscription de l'utilisateur: ${err.message}`
    );
    return APIResponse(response, null, "Erreur serveur", 500);
  }
};

export const login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return APIResponse(response, null, "Utilisateur non trouvé", 404);
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return APIResponse(response, null, "Mot de passe incorrect", 400);
    }

    const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    response.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: NODE_ENV === "production",
    });

    APIResponse(response, null, "Vous êtes connecté", 200);
  } catch (err: any) {
    logger.error(
      `Erreur lors de la connexion de l'utilisateur: ${err.message}`
    );
    APIResponse(response, null, "Erreur serveur", 500);
  }
};

export const logout = (request: Request, response: Response) => {
  response.clearCookie("accessToken");
  APIResponse(response, null, "Vous êtes déconnecté", 200);
};
