export function clsx(classes: { [key: string]: boolean }): string {
  if (typeof classes !== 'object') {
    throw new Error('invalid params')
  }

  return Object.keys(classes)
    .filter((key) => classes[key] === true)
    .join(' ')
}
