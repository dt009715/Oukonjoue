import { Router } from "express";
import app from "../backend";
const router = Router();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/", (req, res) => {
  res.render("home", { title: "Bienvenue !" });
});

app.get("/", (req, res) => {
  res.redirect("/login");
});
export default router;
