import axios, { AxiosInstance } from "axios";
import { GetItemsOutput } from "./skinport-requester.dto";
import { ISkinportRequester } from "./skinport-requester.interface";

export class AxiosSkinportRequester implements ISkinportRequester {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://api.skinport.com/v1",
    });
  }

  async getItems(): Promise<GetItemsOutput[]> {
    const res = await this.client.get<GetItemsOutput[]>("/items");

    return res.data;
  }
}
