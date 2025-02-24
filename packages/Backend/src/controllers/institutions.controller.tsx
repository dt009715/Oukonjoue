import { Request, Response } from "express";
import {
  createInstitution,
  deleteInstitution,
  getAllInstitutions,
  getInstitutionByCategory,
  getInstitutionById,
} from "../models/insitution.model";

export const getInstitutions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const institutions = await getAllInstitutions();
    res.json(institutions);
  } catch (error) {
    console.error("Erreur serveur:", error);
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des institutions",
        error: error.message,
      });
  }
};

export const getInstitution = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const institution = await getInstitutionById(req.params.id);
    if (!institution) {
      return res.status(404).json({ message: "Institution non trouvée" });
    }
    res.json(institution);
  } catch (error) {
    console.error("Erreur serveur:", error);
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération de l'institution",
        error: error.message,
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
      return res.status(404).json({ message: "Institution non trouvée" });
    }
    res.json(institution);
  } catch (error) {
    console.error("Erreur serveur:", error);
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération de l'institution",
        error: error.message,
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
    res
      .status(400)
      .json({
        message: "Erreur de création de l'institution",
        error: error.message,
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
    res
      .status(500)
      .json({
        message: "Erreur lors de la suppression de l'institution",
        error: error.message,
      });
  }
};
