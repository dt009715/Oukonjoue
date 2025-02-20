import { Router } from "express";
import { getArtiste, getArtistes } from "../controllers/artistes.controller";

const router = Router();

// [GET] http://localhost:3000/artistes
router.get("/", getArtistes);

// [GET] http://localhost:3000/artistes/:id
router.get("/:id", getArtiste);

export default router;
