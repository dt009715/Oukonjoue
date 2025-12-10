import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

// [POST] http://localhost:3001/auth/register
router.post("/register", authController.register);

// [POST] http://localhost:3001/auth/login
router.post("/login", authController.login);

// [GET] http://localhost:3001/auth/logout
router.get("/logout", authController.logout);

// [GET] http://localhost:3001/auth/check - Vérifier l'authentification
router.get("/check", authController.checkAuth);

export default router;
