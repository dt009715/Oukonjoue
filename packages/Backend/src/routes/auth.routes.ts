import { Router } from "express";
import jwt from "jsonwebtoken";
import * as authController from "../controllers/auth.controller";

const router = Router();

// [POST] http://localhost:3001/auth/register
router.post("/register", (req, res) => {
  console.log("Requête POST /register reçue !");
  console.log("Données reçues :", req.body);
  authController.register(req, res);
});

// [POST] http://localhost:3001/auth/login
console.log("Route POST /login enregistrée !");
router.post("/login", (req, res) => {
  console.log("Requête POST /login reçue !");
  authController.login;
});

router.get("/logout", authController.logout);

router.get("/test-token", (req, res) => {
  const token = jwt.sign({ id: 123 }, "secretkey", { expiresIn: "1h" });
  console.log("Token envoyé:", token);
  res.json({ token, message: "Test token" });
});

export default router;
