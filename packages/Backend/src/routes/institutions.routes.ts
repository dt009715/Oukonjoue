import { Router } from "express";
import {
  deleteOneInstitution,
  getInstitutionById,
  getInstitutions,
  updateOneInstitution,
} from "../controllers/institutions.controller";
import {
  addComment,
  getCommentsByInstitution,
} from "../controllers/comments.controller";

const router = Router();

// [GET] http://localhost:3001/institutions
router.get("/", getInstitutions);

// [GET] http://localhost:3001/institutions/comments/:institutionId
router.get("/comments/:institutionId", getCommentsByInstitution);

// [POST] http://localhost:3001/institutions/comments
router.post("/comments", addComment);

// [GET] http://localhost:3001/institutions/:id
router.get("/:id", getInstitutionById);

// [DELETE] http://localhost:3001/institutions/deleteinst/:id
router.delete("/deleteinst/:id", deleteOneInstitution);

// [PUT] http://localhost:3001/institutions/updateinst/:id
router.put("/updateinst/:id", updateOneInstitution);

export default router;
