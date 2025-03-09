import { Router } from "express";
import { sendEmail } from "../controllers/mail.controller";

const router = Router();

// [POST] http://localhost:3001/api/send-email
router.post("/send-email", sendEmail);

export default router;
