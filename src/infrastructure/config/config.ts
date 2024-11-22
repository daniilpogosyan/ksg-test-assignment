import dotenv from "dotenv";

export class Config {
  public DATABASE_URL = process.env.DATABASE_URL!;

  constructor() {
    dotenv.config();

    for (const env of Object.keys(this)) {
      if (!this[env as keyof Config]) {
        throw new Error(`${env} is missing`);
      }
    }
  }
}
