import axios, { AxiosInstance } from "axios";
import { Item } from "./skinport-requester.dto";
import { ISkinportRequester } from "./skinport-requester.interface";

export class AxiosSkinportRequester implements ISkinportRequester {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://api.skinport.com/v1",
    });
  }

  async getItems(tradable?: boolean): Promise<Item[]> {
    const res = await this.client.get<Item[]>("/items", {
      params: {
        ...(typeof tradable === "boolean" ? { tradable } : {}),
      },
    });

    return res.data;
  }
}
