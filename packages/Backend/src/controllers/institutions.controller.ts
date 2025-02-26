import { Request, Response } from "express";
import {
  createInstitution,
  deleteInstitution,
  getAllInstitutions,
  getInstitution,
  getInstitutionByCategory,
} from "../models/institution.model";

export const getInstitutions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const institutions = await getAllInstitutions();
    res.json(institutions);
  } catch (error) {
    console.error("Erreur serveur:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Une erreur inconnue s'est produite";
    res.status(500).json({
      message: "Erreur lors de la récupération des institutions",
      error: errorMessage,
    });
  }
};

export const getInstitutionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const institution = await getInstitution(req.params.id);
    if (!institution) {
      res.status(404).json({ message: "Institution non trouvée" });
      return;
    }
    res.json(institution);
  } catch (error) {
    console.error("Erreur serveur:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Une erreur inconnue s'est produite";
    res.status(500).json({
      message: "Erreur lors de la récupération de l'institution",
      error: errorMessage,
    });
  }
};

export const getInstitutionCate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const institution = await getInstitutionByCategory(req.params.category);
    if (!institution) {
      res.status(404).json({ message: "Institution non trouvée" });
      return;
    }
    res.json(institution);
  } catch (error) {
    console.error("Erreur serveur:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Une erreur inconnue s'est produite";
    res.status(500).json({
      message: "Erreur lors de la récupération de l'institution",
      error: errorMessage,
    });
  }
};

export const createNewInstitution = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const institution = await createInstitution(req.body);
    res.status(201).json(institution);
  } catch (error) {
    console.error("Erreur de création:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Une erreur inconnue s'est produite";
    res.status(400).json({
      message: "Erreur de création de l'institution",
      error: errorMessage,
    });
  }
};

export const deleteOneInstitution = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteInstitution(req.params.id);
    res.json({ message: "Institution supprimée avec succès" });
  } catch (error) {
    console.error("Erreur serveur:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Une erreur inconnue s'est produite";
    res.status(500).json({
      message: "Erreur lors de la suppression de l'institution",
      error: errorMessage,
    });
  }
};
