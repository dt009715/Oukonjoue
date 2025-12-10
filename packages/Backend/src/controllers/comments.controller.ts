import { Request, Response } from "express";
import { getDataSource } from "../config/database";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { Institution } from "../entities/Institution";
import { logger } from "../utils";

export const getCommentsByInstitution = async (req: Request, res: Response) => {
  try {
    const { institutionId } = req.params;

    const commentRepository = getDataSource().getRepository(Comment);
    const commentList = await commentRepository.find({
      where: { institution: { id: institutionId } },
      relations: ["author"],
      order: { createdAt: "DESC" },
    });

    // Format response to match frontend expectations: { id, content }
    const formattedComments = commentList.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      author: comment.author ? { id: comment.author.id, email: comment.author.email } : null,
    }));

    res.status(200).json(formattedComments);
  } catch (error: any) {
    logger.error(
      `Erreur lors de la récupération des commentaires: ${error.message}`
    );
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { content, institutionId } = req.body;

    // Get user ID from token (set by authMiddleware)
    const userId = (res.locals.user as { id: string })?.id;
    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    if (!content || !institutionId) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const commentRepository = getDataSource().getRepository(Comment);
    const userRepository = getDataSource().getRepository(User);
    const institutionRepository = getDataSource().getRepository(Institution);

    const author = await userRepository.findOne({ where: { id: userId } });
    const institution = await institutionRepository.findOne({
      where: { id: institutionId },
    });

    if (!author || !institution) {
      return res.status(404).json({ message: "Auteur ou institution non trouvé" });
    }

    const newComment = commentRepository.create({
      content,
      author,
      institution,
    });

    const savedComment = await commentRepository.save(newComment);

    // Recharger le commentaire avec les relations pour avoir l'auteur
    const commentWithAuthor = await commentRepository.findOne({
      where: { id: savedComment.id },
      relations: ["author"],
    });

    // Format response to match frontend expectations: { id, content, author }
    const formattedComment = {
      id: commentWithAuthor!.id,
      content: commentWithAuthor!.content,
      createdAt: commentWithAuthor!.createdAt,
      author: commentWithAuthor!.author
        ? {
            id: commentWithAuthor!.author.id,
            email: commentWithAuthor!.author.email,
          }
        : null,
    };

    res.status(201).json(formattedComment);
  } catch (error: any) {
    logger.error(`Erreur lors de l'ajout du commentaire: ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Get user ID from token (set by authMiddleware)
    const userId = (res.locals.user as { id: string })?.id;
    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const commentRepository = getDataSource().getRepository(Comment);
    const comment = await commentRepository.findOne({
      where: { id },
      relations: ["author"],
    });

    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    // Check author
    if (comment.author.id !== userId) {
      return res.status(403).json({ message: "Action non autorisée" });
    }

    // Delete comment
    await commentRepository.remove(comment);

    res.status(200).json({ message: "Commentaire supprimé avec succès !" });
  } catch (error: any) {
    logger.error(
      `Erreur lors de la suppression du commentaire: ${error.message}`
    );
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
