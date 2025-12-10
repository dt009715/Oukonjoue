import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getDataSource } from "../config/database";
import { User } from "../entities/User";
import { APIResponse } from "../utils";

dotenv.config();

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas défini. Vérifie ton fichier .env !");
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.cookies;
  
  if (!accessToken) {
    return APIResponse(res, null, "Vous devez être connecté", 401);
  }

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET) as { id: string };
    
    // Vérifier que l'utilisateur existe toujours dans la base de données
    const userRepository = getDataSource().getRepository(User);
    const user = await userRepository.findOne({
      where: { id: decoded.id },
    });

    if (!user) {
      return APIResponse(res, null, "Utilisateur non trouvé", 401);
    }

    // Stocker l'utilisateur complet dans res.locals pour utilisation dans les contrôleurs
    res.locals.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (err) {
    return APIResponse(res, null, "Token invalide", 401);
  }
};
