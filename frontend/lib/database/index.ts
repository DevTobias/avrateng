import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqlite = new Database('./lib/database/data.db');
export const db = drizzle(sqlite);
