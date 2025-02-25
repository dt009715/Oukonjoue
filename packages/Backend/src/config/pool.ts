import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "../schemas";
import { env } from "process";

const { DATABASE_URL } = env;
export const pool = new Pool({
  connectionString: DATABASE_URL,
});

// on exporte aussi une instande de NodePgDatabase pour faire des requetes sql directement dessus
export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });
