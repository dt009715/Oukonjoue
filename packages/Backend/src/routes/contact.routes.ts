import { Router } from "express";
import { sendEmail } from "../controllers/mail.controller";

const router = Router();

// [POST] http://localhost:3000/sendEmail
router.post("/send-email", sendEmail);

export default router;
