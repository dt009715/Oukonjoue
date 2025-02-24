import { Router } from "express";
import {
  createIntitution,
  deleteInstitution,
  getInstitution,
  getInstitutions,
} from "../controllers/institutions.controller";

const router = Router();

// [GET] http://localhost:3000/institutions
router.get("/", getInstitutions);

// [GET] http://localhost:3000/institutions/:id
router.get("/:id", getInstitution);

// [POST] http///localhost:3000/createinst/:id
router.post("/createinst", createIntitution);

// [DELETE] http://localhost:3000/deleteinst/:id
router.delete("/deleteinst", deleteInstitution);

export default router;
