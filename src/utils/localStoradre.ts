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

export function localStorageGet(keyArray: string[]) {
  let obj: any = {}
  keyArray.forEach((key) => {
    obj[key] = localStorage.getItem(key)
  })
  return obj
}
