export function arrayToMap<T>(items: T[], cb: (item: T) => string) {
  const map: Record<string, T> = {};

  for (const item of items) {
    map[cb(item)] = item;
  }

  return map;
}
