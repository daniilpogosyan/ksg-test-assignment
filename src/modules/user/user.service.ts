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

  async topUpBalance(userId: number, amount: number) {
    const res = await this.pg.query<UserModel>(
      'UPDATE "user" SET balance = balance + $1 WHERE id = $2 RETURNING *',
      [amount, userId]
    );

    const [user] = res.rows;

    return user;
  }
}
