import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/:insitutionsId", async (req: Request, res: Response) => {
  const { institutionId } = req.params;
  try {
    const comments = await prisma.comments.findMany({
      where: { id: parseInt(institutionId) },
    });
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commentaires." });
  }
});

/*router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getUserIdFromToken();
    const { institutionId, content } = req.body;

    const comment = await prisma.comments.create({
      data: {
        content: content,
        userId: userId,
        institutionId: institutionId,
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Erreur lors de l’ajout du commentaire:", error);
    res.status(500).json({ error: "Erreur lors de l’ajout du commentaire." });
  }
});*/

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.comments.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Commentaire supprimé." });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression." });
  }
});

export default router;
