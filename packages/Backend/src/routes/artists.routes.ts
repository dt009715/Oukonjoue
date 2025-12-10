import { Router } from "express";
import {
  deleteOneArtist,
  getArtist,
  getArtists,
  updateArtist,
} from "../controllers/artists.controller";

const router = Router();
console.log("Routes artistes chargées !");

// [GET] http://localhost:3001/artists
router.get("/", getArtists);

// [GET] http://localhost:3001/api/artistes/:id
router.get("/:id", getArtist);

//[DELETE] http://loclahost:3001/deleteartist/:id
router.delete("/deleteartist/:id", deleteOneArtist);

//[PUT] http://loclahost:3001/updateartist/:id
router.put("/updateartist/:id", updateArtist);

export default router;
