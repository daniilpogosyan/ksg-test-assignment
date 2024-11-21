import { ICacheManager } from "./cache-manager.interface";

export class InMemoryCacheManager implements ICacheManager {
  private readonly cache = new Map<
    string,
    { value: any; expiresAt: number | null }
  >();

  async get<T>(key: string): Promise<T | null> {
    const cached = this.cache.get(key);

    if (
      !cached ||
      (cached.expiresAt !== null && cached.expiresAt < Date.now())
    ) {
      this.clear(key);

      return null;
    }

    return cached.value;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    this.cache.set(key, {
      value: value,
      expiresAt: ttl ? ttl + Date.now() : null,
    });

    return;
  }

  async clear(key: string): Promise<void> {
    this.cache.delete(key);
  }
}
