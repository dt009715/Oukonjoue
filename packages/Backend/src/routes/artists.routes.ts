import { Router } from "express";
import {
  createNewArtist,
  deleteOneArtist,
  getArtist,
  getArtists,
} from "../controllers/artists.controller";

const router = Router();
console.log("🚀 Routes artistes chargées !");

// [GET] http://localhost:3000/artists
router.get("/", getArtists);

// [GET] http://localhost:3000/api/artistes/:id
router.get("/:id", getArtist);

//[POST] http://localhost:3000/createNewArtist/:id
router.post("/createNewArtist", createNewArtist);

//[DELETE] http://loclahost:3000/deleteArtist/:id
router.delete("/createArtist", deleteOneArtist);

export default router;
