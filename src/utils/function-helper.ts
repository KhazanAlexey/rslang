export class FunctionHelper {
  private static createTimeoutName = (timeoutId: string): string => `timeout_${timeoutId}`

  static debounceExecution<A = unknown, R = void>(
    timeoutId: string,
    func: (args?: A) => R,
    delay = 500,
  ) {
    const timeoutName: string = this.createTimeoutName(timeoutId)

    // @ts-ignore
    clearTimeout(window[timeoutName])
    // @ts-ignore
    window[timeoutName] = setTimeout(func, delay)
  }

  static throttleExecution<A = unknown, R = void>(
    timeoutId: string,
    func: (args?: A) => R,
    limit: number,
  ) {
    const timeoutName: string = this.createTimeoutName(timeoutId)

    // @ts-ignore
    if (!window[timeoutName]) {
      func()
      // @ts-ignore
      window[timeoutName] = setTimeout(function () {
        // @ts-ignore
        window[timeoutName] = undefined
      }, limit)
    }
  }
}
