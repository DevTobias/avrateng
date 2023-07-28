import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const ratings = sqliteTable('ratings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_ID').notNull(),
  videoId: integer('video_ID').notNull(),
  videoName: text('video_name').notNull(),
  rating: text('rating').notNull(),
  timestamp: text('timestamp')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const createRatingSchema = createInsertSchema(ratings, { id: z.never(), timestamp: z.never() });
