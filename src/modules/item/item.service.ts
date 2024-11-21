import { ICacheManager } from "../../infrastructure/cache-manager/cache-manager.interface";
import { GetItemsOutput } from "../../infrastructure/skinport-requester/skinport-requester.dto";
import { ISkinportRequester } from "../../infrastructure/skinport-requester/skinport-requester.interface";

export class ItemService {
  constructor(
    private skinportRequester: ISkinportRequester,
    private cacheManager: ICacheManager
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

  buyItem() {
    return true;
  }
}
