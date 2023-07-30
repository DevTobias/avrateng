import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { z } from 'zod';

export const ratings = sqliteTable('ratings', {
  id: text('id').primaryKey(),
  userID: text('user_ID').notNull(),
  groupID: text('group_ID').notNull(),
  videoID: text('video_ID').notNull(),
  rating: integer('rating').notNull(),
  timestamp: text('timestamp')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const createRatingsSchema = z.array(
  z.object({ id: z.string(), userID: z.string(), groupID: z.string(), videoID: z.string(), rating: z.number() })
);
