import { Router } from "express";
import { getUser, getUsers } from "../controllers/users.controller";

const router = Router();

// [GET] http://localhost:3001/users
router.get("/", getUsers);

// [GET] http://localhost:3001/users/:id
router.get("/:id", getUser);

export default router;
