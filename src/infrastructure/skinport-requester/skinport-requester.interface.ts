import { GetItemsOutput } from "./skinport-requester.dto";

export interface ISkinportRequester {
  getItems(): Promise<GetItemsOutput[]>;
}
