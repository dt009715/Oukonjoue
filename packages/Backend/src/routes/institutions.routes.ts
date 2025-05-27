import { Router } from "express";
import {
  deleteOneInstitution,
  getInstitutionById,
  getInstitutions,
  updateOneInstitution,
} from "../controllers/institutions.controller";

const router = Router();

// [GET] http://localhost:3001/institutions
router.get("/", getInstitutions);

// [GET] http://localhost:3001/institutions/:id
router.get("/:id", getInstitutionById);

// [DELETE] http://localhost:3001/institutions/deleteinst/:id
router.delete("/deleteinst/:id", deleteOneInstitution);

//[PUT] http://loclahost:3001/updateartist/:id
router.put("/updateinst/:id", updateOneInstitution);
export default router;
