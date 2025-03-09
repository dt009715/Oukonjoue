import { relations } from "drizzle-orm";
import { comments, users } from "./";

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
}));

export const commentRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.authorId],

    references: [users.id],
  }),

  post: one(posts, {
    fields: [comments.postId],

    references: [posts.id],
  }),
}));

export const postRelation = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.author],
    references: [users.id],
  }),
  comments: many(comments),
}));
