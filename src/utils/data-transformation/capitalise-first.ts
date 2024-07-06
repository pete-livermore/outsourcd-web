export const TYPE_ERROR_MESSAGE =
  'Argument passed to capitaliseFirst must be a string'

export function capitaliseFirst(str: string) {
  if (typeof str !== 'string') {
    throw new TypeError(TYPE_ERROR_MESSAGE)
  }
  if (str.length === 0) {
    return str
  }

  return str[0].toUpperCase() + str.slice(1)
}
