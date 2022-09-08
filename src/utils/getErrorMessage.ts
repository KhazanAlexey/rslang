export function getErrorMessage (e: unknown) {
  if (e instanceof Error) return e.message
  if (typeof e === 'object') return JSON.stringify(e)
  return String(e)
}