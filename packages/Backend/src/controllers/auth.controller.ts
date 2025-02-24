import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { env } from "../config/env";

import { APIResponse, logger } from "../utils";
import { userValidation } from "../validation/users.validation";

const { NODE_ENV, JWT_SECRET } = env;

export const register = async (request: Request, response: Response) => {
  try {
    // Validation des données entrantes avec Zod
    const { email, password, username } = userValidation.parse(request.body);

    return APIResponse(response, null, "Vous êtes inscrit", 200);
  } catch (err: any) {
    // Si l'erreur est lancée par Zod, on informe le client des champs invalides
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

    // ... on insérera ici la logique d'authentification pour vérifier les informations de l'utilisateur
    // ce qui est en dessous: on considére que l'authentification est successful

    const accessToken = jwt.sign({ id: 12 }, JWT_SECRET, { expiresIn: "1h" });

    response.cookie("accessToken", accessToken, {
      httpOnly: true, // Empeche l'accès au cookie via JS
      sameSite: "strict", // Protection contre les attaques CSRF
      secure: NODE_ENV === "production", // On envoit le cookie uniquement via HTTPS
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
