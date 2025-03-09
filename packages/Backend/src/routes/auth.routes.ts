import { Router } from "express";
import { logout, register } from "../controllers/auth.controller";

const router = Router();

// [POST] http://localhost:3000/auth/register
router.post("/register", (req, res) => {
  console.log("Requête POST /register reçue !");
  console.log("Données reçues :", req.body); // Affiche les données envoyées
  register(req, res); // Appelle la fonction `register` pour gérer l'inscription
});

// [POST] http://localhost:3001/auth/login
console.log("Route POST /login enregistrée !");
router.post("/login", (req, res) => {
  console.log("Requête POST /login reçue !");
  res.json({ message: "OK" });
});

// [POST] http://localhost:3000/auth/logout
router.get("/logout", logout);

export default router;
