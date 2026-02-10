import { Router } from "express";
import {
  addComment,
  deleteComment,
  getCommentsByInstitution,
} from "../controllers/comments.controller";

const router = Router();

// [GET] http://localhost:3001/api/comments/:institutionId
router.get("/:institutionId", getCommentsByInstitution);

// [POST] http://localhost:3001/api/comments
router.post("/", addComment);

// [DELETE] http://localhost:3001/api/comments/:id
router.delete("/:id", deleteComment);

export default router;
