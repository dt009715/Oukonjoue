import { Router } from "express";
import {
  getInstitution,
  getInstitutions,
} from "../controllers/institutions.controller";

const router = Router();

// [GET] http://localhost:3000/institutions
router.get("/", getInstitutions);

// [GET] http://localhost:3000/institutions/:id
router.get("/:id", getInstitution);

export default router;
