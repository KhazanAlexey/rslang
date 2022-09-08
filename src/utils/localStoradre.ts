export function localStorageSet(keyArray: string[], payload): void {
  keyArray.forEach((key) => {
    localStorage.setItem(key, payload[key])
  })
}

export function localStorageRemove(keyArray: string[]): void {
  keyArray.forEach((key) => {
    localStorage.removeItem(key)
  })
}

export function localStorageGet(keyArray: string[] = []) {
  return keyArray.reduce((res, key) => {
    res[key] = localStorage.getItem(key)
    return res
  }, {})
}
