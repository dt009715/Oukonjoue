import express from "express";
import {
  getCommentsByInstitution,
  addComment,
  deleteComment,
} from "../controllers/comments.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

// GET /api/comments/:institutionId - Get comments for an institution
router.get("/:institutionId", getCommentsByInstitution);

// POST /api/comments - Add a new comment (requires auth)
router.post("/", authMiddleware, addComment);

// DELETE /api/comments/:id - Delete a comment (requires auth)
router.delete("/:id", authMiddleware, deleteComment);

export default router;
