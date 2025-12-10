import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { comment } from "../schemas";

// Un type pour le modèle d'un Comment au moment de la selection dans la DB
export type Comment = InferSelectModel<typeof comment>;

// Un type pour le modèle d'un Comment au moment de son insertion dans la DB
export type NewComment = InferInsertModel<typeof comment>;

// Un type qui sera un objet avec des clés optionnelles qui correspondent aux colonnes de notre table Comment
export type CommentColumns = { [K in keyof Comment]?: boolean };
