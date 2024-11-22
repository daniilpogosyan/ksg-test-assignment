import { ICacheManager } from "../../infrastructure/cache-manager/cache-manager.interface";
import { Postgres } from "../../infrastructure/postgres/postgres";
import { Item } from "../../infrastructure/skinport-requester/skinport-requester.dto";
import { ISkinportRequester } from "../../infrastructure/skinport-requester/skinport-requester.interface";
import { arrayToMap } from "../../utils/array-to-map";
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

    let result = await this.cacheManager.get<
      Array<Item & { min_tradable_price: number }>
    >(ITEMS_CACHE_KEY);

    if (result) {
      return result;
    }

    const [tradable, notTradable] = await Promise.all([
      this.skinportRequester.getItems(true),
      this.skinportRequester.getItems(false),
    ]);

    result = this.aggregateGetItems(tradable, notTradable);
    await this.cacheManager.set(ITEMS_CACHE_KEY, result, ITEMS_CACHE_TTL);

    return result;
  }

  private aggregateGetItems(
    tradable: Item[],
    notTradable: Item[]
  ): Array<Item & { min_tradable_price: number }> {
    const tradableMapped = arrayToMap(
      tradable,
      (item) => item.market_hash_name
    );

    return notTradable.map((notTradableItem) => {
      return {
        ...notTradableItem,
        min_tradable_price:
          tradableMapped[notTradableItem.market_hash_name].min_price,
      };
    });
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
