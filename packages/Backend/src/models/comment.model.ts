import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { NewComment } from "../entities/Comment";
import { comments } from "../schemas";
import { logger } from "../utils";

export const pushComment = async (comment: NewComment) => {
  try {
    return await db.insert(comments).values(comment).execute();
  } catch (err: any) {
    logger.error(`Erreur lors de la création du commentaire: ${err.message}`);
    throw new Error("Impossible de créer le commentaire");
  }
};

export const deleteComment = async (id: string, userId: string) => {
  try {
    return await db
      .delete(comments)
      .where(and(eq(comments.id, id), eq(comments.authorId, userId)))
      .execute();
  } catch (err: any) {
    logger.error(
      `Erreur lors de la suppression du commentaire: ${err.message}`
    );
    throw new Error("Impossible de supprimer le commentaire");
  }
};

export const getCommentById = async (id: string) => {
  try {
    return await db.query.comments.findFirst({
      where: eq(comments.id, id),
      columns: {
        id: true,
        content: true,
      },
      with: {
        post: {
          columns: {
            id: true,
            title: true,
          },
        },
        user: {
          columns: {
            id: true,
            username: true,
          },
        },
      },
    });
  } catch (err: any) {
    logger.error(
      `Erreur lors de la récupération du commentaire: ${err.message}`
    );
    throw new Error("Impossible de récupérer le commentaire");
  }
};
