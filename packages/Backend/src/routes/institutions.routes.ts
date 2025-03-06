import { Router } from "express";
import {
  deleteOneInstitution,
  getInstitutionById,
  getInstitutions,
} from "../controllers/institutions.controller";

const router = Router();

// [GET] http://localhost:3000/institutions
router.get("/", getInstitutions);

// [GET] http://localhost:3000/institutions/:id
router.get("/:id", getInstitutionById);

// [DELETE] http://localhost:3000/institutions/deleteinst/:id
router.delete("/deleteinst/:id", deleteOneInstitution);

export default router;
