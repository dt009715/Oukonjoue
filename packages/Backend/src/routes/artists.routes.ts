import { Router } from "express";
import {
  deleteOneArtist,
  getArtist,
  getArtists,
} from "../controllers/artists.controller";

const router = Router();
console.log("🚀 Routes artistes chargées !");

// [GET] http://localhost:3001/artists
router.get("/", getArtists);

// [GET] http://localhost:3001/api/artistes/:id
router.get("/:id", getArtist);

//[DELETE] http://loclahost:3001/deleteArtist/:id
router.delete("/deleteArtist", deleteOneArtist);

export default router;
