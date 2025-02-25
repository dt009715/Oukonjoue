import { Request, Response } from "express";
import {
  createArtist,
  deleteArtist,
  getAllArtists,
  getArtistById,
  getArtistsByCategory,
} from "../models/artist.model";

export const getArtists = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const institutions = await getAllArtists();
    res.json(institutions);
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
    const institution = await getArtistById(req.params.id);
    if (!institution) {
      res.status(404).json({ message: "artiste non trouvée" });
      return;
    }
    res.json(institution);
  } catch (error) {
    console.error("Erreur serveur:", error);
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
    const institution = await getArtistsByCategory(req.params.category);
    if (!institution) {
      res.status(404).json({ message: "artiste non trouvée" });
      return;
    }
    res.json(institution);
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
    const institution = await createArtist(req.body);
    res.status(201).json(institution);
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
