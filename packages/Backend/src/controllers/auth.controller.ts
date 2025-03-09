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
    city: z.string().optional(),
    category: z.string().optional(),
    address: z.string().optional(),
    genre: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(["ARTISTS", "INSTITUTIONS"]),
  });

  try {
    const data = validationSchema.parse(request.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
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

export const login = async (request: Request, response: Response) => {
  console.log("Requête reçue pour /auth/login");
  try {
    const { mail, password } = request.body;

    console.log(`Mail: ${mail}, Password: ${password}`);

    const user = await prisma.user.findUnique({
      where: { email: mail },
    });

    if (!user) {
      console.log(`Utilisateur avec email ${mail} non trouvé.`);
      return response.status(404).json({ message: "Utilisateur non trouvé" });
    }

    console.log(`Mot de passe récupéré dans la DB: ${user.password}`);

    const passwordIsValid = await bcrypt.compare(password, user.password);
    console.log(`Mot de passe comparé: ${passwordIsValid}`);

    if (!passwordIsValid) {
      console.log("Mot de passe incorrect.");
      return response.status(400).json({ message: "Mot de passe incorrect" });
    }

    const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    response.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: NODE_ENV === "production",
    });

    response
      .status(200)
      .json({ token: accessToken, message: "Vous êtes connecté" });
  } catch (err: any) {
    console.error(
      `Erreur lors de la connexion de l'utilisateur: ${err.message}`
    );
    response.status(500).json({ message: "Erreur serveur" });
  }
};
export const logout = (request: Request, response: Response) => {
  response.clearCookie("accessToken");
  APIResponse(response, null, "Vous êtes déconnecté", 200);
};

/*export const deleteUser = async (request: Request, response: Response) => {
  const userId = request.params.id;  

  try {
    
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }, 
    });

    if (!user) {
      return APIResponse(response, null, "Utilisateur non trouvé", 404);
    }

    

 
    await prisma.comment.deleteMany({
      where: { userId: user.id },
    });

    await prisma.user.delete({
      where: { id: user.id },
    });

    return APIResponse(response, null, "Utilisateur et ses données supprimées avec succès", 200);
  } catch (err: any) {
    console.error(`Erreur lors de la suppression de l'utilisateur: ${err.message}`);
    return APIResponse(response, null, "Erreur serveur", 500);
  }
};*/
