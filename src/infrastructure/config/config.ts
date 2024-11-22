import dotenv from "dotenv";

export class Config {
  public readonly DATABASE_URL: string;

  constructor() {
    dotenv.config();

    this.DATABASE_URL = process.env.DATABASE_URL!;

    for (const env of Object.keys(this)) {
      if (!this[env as keyof Config]) {
        throw new Error(`${env} is missing`);
      }
    }
  }
}
