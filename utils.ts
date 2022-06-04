export function genListFromNum<T>(num: number, cb: (i: number) => T) {
  return Array.from({ length: num }).map((_, i) => cb(i))
}
