import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from ".";

export const comment = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  commentId: uuid("comment_id")
    .references(() => comments.id, { onDelete: "cascade" })
    .notNull(),
  authorId: uuid("author_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
