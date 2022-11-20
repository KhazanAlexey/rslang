export class FunctionHelper {
  private static createTimeoutName = (timeoutId: string): string => `timeout_${timeoutId}`

  static debounceExecution<A = unknown, R = void>(
    timeoutId: string,
    func: (args?: A) => R,
    delay = 500,
  ) {
    const timeoutName: string = this.createTimeoutName(timeoutId)

    clearTimeout(window[timeoutName])
    window[timeoutName] = setTimeout(func, delay)
  }

  static throttleExecution<A = unknown, R = void>(
    timeoutId: string,
    func: (args?: A) => R,
    limit: number,
  ) {
    const timeoutName: string = this.createTimeoutName(timeoutId)

    if (!window[timeoutName]) {
      func()
      window[timeoutName] = setTimeout(function () {
        window[timeoutName] = undefined
      }, limit)
    }
  }
}
