import { Router } from "express";
import { contact } from "../controllers/contact.controller";

const router = Router();

// [POST] http://localhost:3000/contact
router.post("/register", contact);

export default router;
