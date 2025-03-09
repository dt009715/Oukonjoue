import { Router } from "express";

const router = Router();

// [GET] http://localhost:3001/
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// [GET] http://localhost:3001/api/send-email
router.get("/", (req, res) => {
  res.render("home", { title: "Bienvenue !" });
});

export default router;
