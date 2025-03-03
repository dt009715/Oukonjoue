import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import commentRoutes from "./routes/comments.routes";
import routes from "./routes/index.routes";

require("dotenv").config();

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

app.use("/api/comments", commentRoutes);
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

export default app;
