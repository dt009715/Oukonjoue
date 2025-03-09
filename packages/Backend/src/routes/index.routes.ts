import { Router } from "express";

import artistesRoutes from "./artists.routes";
import authRoutes from "./auth.routes";
import contactRoutes from "./contact.routes";
import homeRoutes from "./home.routes";
import institutionsRoutes from "./institutions.routes";
import userRoutes from "./user.routes";

const path = require("path");

const router = Router();

// http://localhost:3001/users
router.use("/users", userRoutes);

// http://localhost:3001/auth
router.use("/auth", authRoutes);

// http://localhost:3001/home
router.use("/", homeRoutes);

//http://localhost:3001/institutions
router.use("/institutions", institutionsRoutes);

//http://localhost:3001/artistes
router.use("/artistes", artistesRoutes);

//http://localhost:3001/contact
router.use("/contact", contactRoutes);

//http://localhost:3001/cookie
router.get("/cookies", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//http://localhost:3001/legal-mentions
router.get("/legal-mentions", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

export default router;
