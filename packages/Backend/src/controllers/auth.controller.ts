import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { getDataSource } from "../config/database";
import { User } from "../entities/User";
import { registerUser } from "../models/UserModel";
import { APIResponse, logger } from "../utils";

dotenv.config();
const bcrypt = require("bcrypt");

const { NODE_ENV, JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas défini. Vérifie ton fichier .env !");
}

export const register = async (request: Request, response: Response) => {
  console.log("Register appelé avec:", request.body);
  const validationSchema = z.object({
    mail: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    image: z.string().optional(),
    phone: z.string().optional(),
    city: z.string().optional(),
    category: z.string().optional(),
    address: z.string().optional(),
    genre: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(["ARTISTS", "INSTITUTIONS"]),
  });

  try {
    const data = validationSchema.parse(request.body);

    const userRepository = getDataSource().getRepository(User);
    const existingUser = await userRepository.findOne({
      where: { email: data.mail },
    });

    if (existingUser) {
      return APIResponse(response, null, "Cet email est déjà utilisé", 400);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await registerUser({
      name: data.name,
      password: hashedPassword,
      image: data.image || "default.jpg",
      phone: data.phone || "Non disponible",
      mail: data.mail || "Non disponible",
      city: data.city || "Ville inconnue",
      category: data.category || "Non spécifié",
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

export const login = async (req: Request, res: Response) => {
  const { mail, password } = req.body;

  // Validation des champs requis
  if (!mail || !password) {
    return APIResponse(res, null, "Email et mot de passe requis", 400);
  }

  const userRepository = getDataSource().getRepository(User);
  const user = await userRepository.findOne({
    where: { email: mail },
  });

  if (!user) {
    return APIResponse(res, null, "Email ou mot de passe incorrect", 401);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return APIResponse(res, null, "Email ou mot de passe incorrect", 401);
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

  // Mettre le token dans un cookie httpOnly (sécurisé)
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000, // 1 heure
  });

  // Retourner aussi le token dans la réponse JSON pour le frontend
  return APIResponse(
    res,
    { token, user: { id: user.id, email: user.email, role: user.role } },
    "Vous êtes connecté",
    200
  );
};

export const logout = (request: Request, response: Response) => {
  response.clearCookie("accessToken");
  APIResponse(response, null, "Vous êtes déconnecté", 200);
};

// Endpoint pour vérifier l'authentification
export const checkAuth = async (req: Request, res: Response) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return APIResponse(res, null, "Non authentifié", 401);
  }

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET) as { id: string };
    const userRepository = getDataSource().getRepository(User);
    const user = await userRepository.findOne({
      where: { id: decoded.id },
    });

    if (!user) {
      return APIResponse(res, null, "Utilisateur non trouvé", 401);
    }

    return APIResponse(
      res,
      { user: { id: user.id, email: user.email, role: user.role } },
      "Authentifié",
      200
    );
  } catch (err) {
    return APIResponse(res, null, "Token invalide", 401);
  }
};
