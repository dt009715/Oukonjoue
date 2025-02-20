import { Router } from "express";

import artistesRoutes from "./artistes.routes";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import contactRoutes from "./contact.routes";
import institutionsRoutes from "./institutions.routes";

const router = Router();

// http://localhost:3000/users
router.use("/users", userRoutes);

// http://localhost:3000/auth
router.use("/auth", authRoutes);

// http://localhost:3000/home
router.use("/", homeRoutes);

//http://localhost:3000/institutions
router.use("/institutions", institutionsRoutes);

//http://localhost:3000/artistes
router.use("/artistes", artistesRoutes);

//http://localhost:3000/contact
router.use("/contact", contactRoutes);

export default router;
