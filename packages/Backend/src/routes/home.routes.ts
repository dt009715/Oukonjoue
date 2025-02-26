import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router.get("/", (req, res) => {
  res.render("home", { title: "Bienvenue !" });
});

router.get("/", (req, res) => {
  res.redirect("/login");
});

export default router;
