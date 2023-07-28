import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/database/schema/*.ts',
  driver: 'better-sqlite',
  out: './lib/database/drizzle',
  dbCredentials: {
    url: './lib/database/data.db',
  },
} satisfies Config;
