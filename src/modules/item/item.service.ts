import { ICacheManager } from "../../infrastructure/cache-manager/cache-manager.interface";
import { Postgres } from "../../infrastructure/postgres/postgres";
import { GetItemsOutput } from "../../infrastructure/skinport-requester/skinport-requester.dto";
import { ISkinportRequester } from "../../infrastructure/skinport-requester/skinport-requester.interface";
import { UserModel } from "../user/user.model";

export class ItemService {
  constructor(
    private skinportRequester: ISkinportRequester,
    private cacheManager: ICacheManager,
    private pg: Postgres
  ) {}

  async getItems() {
    const ITEMS_CACHE_KEY = "SKINPORT_ITEMS";
    const ITEMS_CACHE_TTL = 300_000;

    let items = await this.cacheManager.get<GetItemsOutput[]>(ITEMS_CACHE_KEY);

    if (items) {
      return items;
    }

    items = await this.skinportRequester.getItems();
    await this.cacheManager.set(ITEMS_CACHE_KEY, items, ITEMS_CACHE_TTL);

    return items;
  }

  async buyItem(userId: number, price: number) {
    await this.pg.tx(async (client) => {
      const userResult = await client.query<UserModel>(
        'SELECT * FROM "user" WHERE "user".id = $1',
        [userId]
      );
      const [user] = userResult.rows;

      if (!user) {
        throw new Error("User is not found");
      }

      if (user.balance < price) {
        throw new Error("User balance is insufficient");
      }

      await client.query(
        'UPDATE "user" SET balance = $1 WHERE "user".id = $2',
        [user.balance - price, userId]
      );
    });
  }
}
