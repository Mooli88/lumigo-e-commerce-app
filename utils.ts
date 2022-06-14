export function genListFromNum<T>(num: number, cb: (i: number) => T) {
  return Array.from({ length: num }).map((_, i) => cb(i))
}

export const getFromLocalStorage = <T>(
  key: string,
  extractor?: (val: T) => any
) => {
  if (typeof window === 'undefined') return

  try {
    const data: any = localStorage.getItem(key)
    const res = JSON.parse(data)
    return extractor ? extractor(res) : res
  } catch (error) {
    if (error instanceof Error)
      console.warn(
        `LocalStorage: ${key} not found, or invalid JSON. - ${error.message}`
      )
  }
}
