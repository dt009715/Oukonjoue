import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import routes from "./routes/index.routes";

dotenv.config();
// Creation instance app express
const app = express();
const { PORT, FRONTEND_URL } = process.env;

app.use(cookieParser());
// Configuration CORS pour permettre les requetes de toutes les origines
app.use(
  cors({
    origin: FRONTEND_URL, // Autoriser uniquement cette adresse à requeter sur le serveur
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Methodes HTTP autorisées
    credentials: true, // Autoriser l'envoi de cookie (JWT par exemple)
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

export default app;
