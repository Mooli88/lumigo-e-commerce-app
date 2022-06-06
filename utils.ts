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
    console.error(
      '🚀 ~ file: utils.ts ~ line 11 ~ saveStateLocally ~ error',
      error
    )
  }
}
