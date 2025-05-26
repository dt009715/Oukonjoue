import { Request, Response } from "express";
import {
  createArtist,
  deleteArtist,
  getAllArtists,
  getArtistById,
  getArtistsByCategory,
  updateArtistById,
} from "../models/artist.model";

export const getArtists = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const artist = await getAllArtists();
    res.json(artist);
  } catch (error) {
    console.error("Erreur serveur:", error);
    const err = error as Error;
    res.status(500).json({
      message: "Erreur lors de la récupération des artistes",
      error: err.message,
    });
  }
};

export const getArtist = async (req: Request, res: Response): Promise<void> => {
  try {
    const artistId = req.params.id;
    console.log(` Recherche de l'artiste avec l'ID: ${artistId}`);

    const artist = await getArtistById(artistId);

    if (!artist) {
      res.status(404).json({ message: "Artiste non trouvé" });
      return;
    }

    res.json(artist);
  } catch (error) {
    console.error(" Erreur serveur:", error);
    const err = error as Error;
    res.status(500).json({
      message: "Erreur lors de la récupération de l'artiste",
      error: err.message,
    });
  }
};

export const getArtistsCate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const artist = await getArtistsByCategory(req.params.category);
    if (!artist) {
      res.status(404).json({ message: "artiste non trouvée" });
      return;
    }
    res.json(artist);
  } catch (error) {
    console.error("Erreur serveur:", error);
    const err = error as Error;
    res.status(500).json({
      message:
        "Erreur lors de la récupération de l'artiste en fonction de sa catégorie",
      error: err.message,
    });
  }
};

export const createNewArtist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const artist = await createArtist(req.body);
    res.status(201).json(artist);
  } catch (error) {
    console.error("Erreur de création:", error);
    const err = error as Error;
    res.status(400).json({
      message: "Erreur de création de l'artiste",
      error: err.message,
    });
  }
};

export const deleteOneArtist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteArtist(req.params.id);
    res.json({ message: "artiste supprimée avec succès" });
  } catch (error) {
    console.error("Erreur serveur:", error);
    const err = error as Error;
    res.status(500).json({
      message: "Erreur lors de la suppression de l'artiste",
      error: err.message,
    });
  }
};

export const updateArtist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const artistId = req.params.id;
    const updatedData = req.body;

    const updatedArtist = await updateArtistById(artistId, updatedData);

    if (!updatedArtist) {
      res.status(404).json({ message: "Artiste non trouvé" });
      return;
    }

    res
      .status(200)
      .json({ message: "Artiste mis à jour", artist: updatedArtist });
  } catch (error) {
    console.error("Erreur serveur:", error);
    const err = error as Error;
    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'artiste",
      error: err.message,
    });
  }
};
