export interface ICacheManager {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: any, ttl?: number): Promise<void>;
  clear(key: string): Promise<void>;
}
