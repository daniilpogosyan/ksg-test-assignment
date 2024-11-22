import { Item } from "./skinport-requester.dto";

export interface ISkinportRequester {
  getItems(tradable?: boolean): Promise<Item[]>;
}
