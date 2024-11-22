import { Postgres } from "../../infrastructure/postgres/postgres";
import { UserModel } from "./user.model";

export class UserService {
  constructor(private pg: Postgres) {}

  async createUser() {
    const res = await this.pg.query<UserModel>(
      'INSERT INTO "user" DEFAULT VALUES RETURNING *'
    );
    const [user] = res.rows;

    return user;
  }
}
