import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { APIResponse } from "../utils";

dotenv.config();

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas défini. Vérifie ton fichier .env !");
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.cookies;
  if (!accessToken)
    return APIResponse(res, null, "Vous devez être connecté", 401);

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    res.locals.user = decoded;
    next();
  } catch (err) {
    return APIResponse(res, null, "Token invalide", 401);
  }
};
