import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Comment } from "../entities/Comment";
import { logger } from "../utils";

export const getCommentsByInstitution = async (req: Request, res: Response) => {
  try {
    const { institutionId } = req.params;

    const repo = AppDataSource.getRepository(Comment);
    const commentList = await repo.find({
      where: { institutionId },
      order: { createdAt: "DESC" },
    });

    res.status(200).json(commentList);
  } catch (error: any) {
    logger.error(
      `Erreur lors de la recuperation des commentaires: ${error.message}`
    );
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { content, institutionId, author } = req.body;

    if (!content || !institutionId) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const repo = AppDataSource.getRepository(Comment);
    const comment = repo.create({ content, institutionId, author });
    const saved = await repo.save(comment);

    res.status(201).json(saved);
  } catch (error: any) {
    logger.error(`Erreur lors de l'ajout du commentaire: ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const repo = AppDataSource.getRepository(Comment);
    await repo.delete({ id });

    res.status(200).json({ message: "Commentaire supprime avec succes !" });
  } catch (error: any) {
    logger.error(
      `Erreur lors de la suppression du commentaire: ${error.message}`
    );
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
