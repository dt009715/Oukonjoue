import { Router } from "express";
import { logout, register } from "../controllers/auth.controller";

const router = Router();

// [POST] http://localhost:3001/auth/register
router.post("/register", (req, res) => {
  console.log("Requête POST /register reçue !");
  console.log("Données reçues :", req.body);
  register(req, res);
});

// [POST] http://localhost:3001/auth/login
console.log("Route POST /login enregistrée !");
router.post("/login", (req, res) => {
  console.log("Requête POST /login reçue !");
  res.json({ message: "OK" });
});

// [POST] http://localhost:3001/auth/logout
router.get("/logout", logout);

export default router;
