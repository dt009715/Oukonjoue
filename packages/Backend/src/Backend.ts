import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import commentRoutes from "./routes/comments.routes";
import routes from "./routes/index.routes";
import { initializeDatabase } from "./config/database";

dotenv.config();
const app = express();
const { PORT, FRONTEND_URL } = process.env;

app.use(cookieParser());
console.log("FRONTEND_URL utilisé pour CORS :", FRONTEND_URL);

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

// Initialize database before starting server
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });

export default app;
