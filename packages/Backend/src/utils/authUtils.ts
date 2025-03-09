import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  userId: number;
}

export function getUserIdFromToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token non fourni");
  }

  try {
    const decoded = jwt.verify(token, "votre_secret_jwt") as CustomJwtPayload;
    return decoded.userId;
  } catch (error) {
    throw new Error("Token invalide");
  }
}
