import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { NewComment } from "../entities/Comment";
import { comment } from "../schemas";
import { logger } from "../utils";

//create a new comment
export const pushComment = async (newComment: NewComment) => {
  try {
    const { commentId, authorId, content, createdAt } = newComment;

    return await db
      .insert(comment)
      .values({
        commentId: commentId || null,
        authorId,
        content,
        createdAt: createdAt || new Date().toISOString(),
      })
      .execute();
  } catch (err: any) {
    logger.error(`Erreur lors de la création du commentaire: ${err.message}`);
    throw new Error("Impossible de créer le commentaire");
  }
};

//delete a comment
export const deleteComment = async (id: string, userId: string) => {
  try {
    return await db
      .delete(comment)
      .where(and(eq(comment.id, id), eq(comment.authorId, userId)))
      .execute();
  } catch (err: any) {
    logger.error(
      `Erreur lors de la suppression du commentaire: ${err.message}`
    );
    throw new Error("Impossible de supprimer le commentaire");
  }
};
