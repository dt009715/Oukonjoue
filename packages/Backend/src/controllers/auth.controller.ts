import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { APIResponse, logger } from "../utils";
import { userValidation } from "../validation/users.validation";

dotenv.config();

const { NODE_ENV, JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas défini. Vérifie ton fichier .env !");
}

export const register = async (request: Request, response: Response) => {
  try {
    const { email, password, username } = userValidation.parse(request.body);

    return APIResponse(response, null, "Vous êtes inscrit", 200);
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
    APIResponse(response, null, "Erreur serveur", 500);
  }
};

export const login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const accessToken = jwt.sign({ id: 12 }, JWT_SECRET, { expiresIn: "1h" });

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
