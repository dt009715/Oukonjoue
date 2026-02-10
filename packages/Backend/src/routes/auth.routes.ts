import { Router } from "express";
import jwt from "jsonwebtoken";
import * as authController from "../controllers/auth.controller";

const router = Router();

// [POST] http://localhost:3001/auth/register
router.post("/register", authController.register);

// [POST] http://localhost:3001/auth/login
router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.get("/test-token", (req, res) => {
  const token = jwt.sign({ id: 123 }, "secretkey", { expiresIn: "1h" });
  console.log("Token envoye:", token);
  res.json({ token, message: "Test token" });
});

export default router;
