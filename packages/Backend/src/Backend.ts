import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { AppDataSource } from "./config/data-source";
import commentRoutes from "./routes/comments.routes";
import routes from "./routes/index.routes";

dotenv.config();
const app = express();
const { PORT, FRONTEND_URL } = process.env;

app.use(cookieParser());
console.log("FRONTEND_URL utilise pour CORS :", FRONTEND_URL);

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.use("/api/comments", commentRoutes);
app.use("/", routes);

const port = PORT ? Number(PORT) : 3001;

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Serveur lance sur http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Erreur de connexion a la base de donnees:", error);
    process.exit(1);
  });

export default app;
