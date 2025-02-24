import { Request, Response } from "express";
import {
  createArtist,
  deleteArtist,
  getAllArtists,
  getArtistById,
  getArtistsByCategory,
} from "../models/artists.model";

export const getArtists = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const institutions = await getAllArtists();
    res.json(institutions);
  } catch (error) {
    console.error("Erreur serveur:", error);
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des artistes",
        error: error.message,
      });
  }
};

export const getArtist = async (req: Request, res: Response): Promise<void> => {
  try {
    const institution = await getArtistById(req.params.id);
    if (!institution) {
      return res.status(404).json({ message: "artiste non trouvée" });
    }
    res.json(institution);
  } catch (error) {
    console.error("Erreur serveur:", error);
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération de l'artiste",
        error: error.message,
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
      return res.status(404).json({ message: "artiste non trouvée" });
    }
    res.json(institution);
  } catch (error) {
    console.error("Erreur serveur:", error);
    res
      .status(500)
      .json({
        message:
          "Erreur lors de la récupération de l'artiste en fonction de sa catégorie",
        error: error.message,
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
    res
      .status(400)
      .json({
        message: "Erreur de création de l'artiste",
        error: error.message,
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
    res
      .status(500)
      .json({
        message: "Erreur lors de la suppression de l'artiste ",
        error: error.message,
      });
  }
};
