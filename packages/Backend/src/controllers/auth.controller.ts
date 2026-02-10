import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";

import { findUserByEmail, registerUser } from "../models/UserModel";
import { APIResponse, logger } from "../utils";

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas defini. Verifie ton fichier .env !");
}

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

export const register = async (request: Request, response: Response) => {
  try {
    const data = validationSchema.parse(request.body);

    const existingUser = await findUserByEmail(data.mail);
    if (existingUser) {
      return APIResponse(response, null, "Cet email est deja utilise", 400);
    }

    await registerUser({
      name: data.name,
      password: data.password,
      image: data.image,
      phone: data.phone,
      mail: data.mail,
      city: data.city,
      category: data.category,
      address: data.address,
      description: data.description,
      role: data.type,
    });

    return APIResponse(response, null, "Vous etes inscrit avec succes", 200);
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

  if (!mail || !password) {
    return APIResponse(res, null, "Email et mot de passe requis", 400);
  }

  const user = await findUserByEmail(mail);

  if (!user) {
    return APIResponse(res, null, "Utilisateur non trouve avec l'email", 401);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return APIResponse(res, null, "Email ou mot de passe incorrect", 401);
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "lax",
    maxAge: 3600000,
  });

  return APIResponse(res, { role: user.role }, "Vous etes connecte", 200);
};

export const logout = (request: Request, response: Response) => {
  response.clearCookie("accessToken");
  APIResponse(response, null, "Vous etes deconnecte", 200);
};
