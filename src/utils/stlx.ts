/* eslint-disable @typescript-eslint/no-explicit-any */
import { StringHelper } from './string-helper'

function normalizeStyleName(styleName: string): string {
  const words = styleName.split('-')

  for (let i = 0; i < words.length; i++) {
    if (i === 0) {
      continue
    }

    words[i] = StringHelper.capitalize(words[i])
  }

  return words.join('')
}

export function stlx(styles: { [key: string]: boolean }): Record<string, unknown> {
  if (typeof styles !== 'object') {
    throw new Error('invalid params')
  }

  const allowedStyles = Object.keys(styles).filter((key) => styles[key])

  const style: any = {}
  for (const allowedStyle of allowedStyles) {
    const separatorIndex = allowedStyle.indexOf(':')
    if (separatorIndex === -1) {
      continue
    }

    let propName = allowedStyle.slice(0, separatorIndex)
    propName = normalizeStyleName(propName)

    const propValue = allowedStyle.slice(separatorIndex + 1, allowedStyle.length)
    style[propName] = propValue.replace(';', '')
  }

  return style
}
