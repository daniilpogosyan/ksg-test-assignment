import dotenv from "dotenv";
import { Client } from "pg";
import Pool from "pg-pool";

dotenv.config();

export class Postgres extends Pool<Client> {
  constructor(config: Pool.Config<Client>) {
    super(config);
  }

  async tx<T>(cb: (client: Client) => T) {
    const client = await this.connect();

    try {
      try {
        await client.query("BEGIN");
        const result = await cb(client);
        await client.query("COMMIT");
        return result;
      } catch (err) {
        await client.query("ROLLBACK");
        throw err;
      }
    } finally {
      client.release();
    }
  }
}
