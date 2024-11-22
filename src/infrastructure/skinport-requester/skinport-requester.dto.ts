export enum Currency {
  AUD = "AUD",
  BRL = "BRL",
  CAD = "CAD",
  CHF = "CHF",
  CNY = "CNY",
  CZK = "CZK",
  DKK = "DKK",
  EUR = "EUR",
  GBP = "GBP",
  HRK = "HRK",
  NOK = "NOK",
  PLN = "PLN",
  RUB = "RUB",
  SEK = "SEK",
  TRY = "TRY",
  USD = "USD",
}

export type Item = {
  market_hash_name: string;
  currency: Currency;
  suggested_price: number;
  item_page: string;
  market_page: string;
  min_price: number;
  max_price: number;
  mean_price: number;
  median_price: number;
  quantity: number;
  created_at: number;
  updated_at: number;
};
