export class StringHelper {
  static capitalize(text: string): string {
    if (!text) {
      return text
    }

    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  /**
   * @description parses text to json, if it fails, returns null
   */

}
