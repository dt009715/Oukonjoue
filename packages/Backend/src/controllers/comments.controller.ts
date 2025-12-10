import { and, eq } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../config/pool";
import { NewComment } from "../entities/comment";
import { comments } from "../schemas";
import { logger } from "../utils";

export const getCommentsByInstitution = async (req: Request, res: Response) => {
  try {
    const { parentId } = req.params;

    const commentList = await db.query.comments.findMany({
      where: eq(comments.commentId, parentId),
      orderBy: (comments) => comments.createdAt.desc(),
      with: {
        user: {
          columns: { id: true, username: true },
        },
      },
    });

    res.status(200).json(commentList);
  } catch (error: any) {
    logger.error(
      `Erreur lors de la récupération des commentaires: ${error.message}`
    );
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { content, authorId, postId } = req.body;

    if (!content || !authorId || !postId) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const newComment: NewComment = {
      content,
      authorId,
      postId,
      createdAt: new Date(),
    };

    await db.insert(comments).values(newComment).execute();

    res.status(201).json({ message: "Commentaire ajouté avec succès !" });
  } catch (error: any) {
    logger.error(`Erreur lors de l'ajout du commentaire: ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // check commentary exist
    const comment = await db.query.comments.findFirst({
      where: eq(comments.id, id),
    });

    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    // check author
    if (comment.authorId !== userId) {
      return res.status(403).json({ message: "Action non autorisée" });
    }

    // delete commment
    await db
      .delete(comments)
      .where(and(eq(comments.id, id), eq(comments.authorId, userId)))
      .execute();

    res.status(200).json({ message: "Commentaire supprimé avec succès !" });
  } catch (error: any) {
    logger.error(
      `Erreur lors de la suppression du commentaire: ${error.message}`
    );
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
