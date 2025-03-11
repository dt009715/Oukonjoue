import { Router } from "express";

const router = Router();

// [GET] http://localhost:3001/
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

export default router;
