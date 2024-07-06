import { capitaliseFirst, TYPE_ERROR_MESSAGE } from './capitalise-first'

describe('capitalizeFirst', () => {
  it('should throw an error if passed a non-string arg', () => {
    const invalidArg = { foo: 'bar' } as unknown

    expect(() => capitaliseFirst(invalidArg as string)).toThrow(TypeError)
    expect(() => capitaliseFirst(invalidArg as string)).toThrow(
      TYPE_ERROR_MESSAGE,
    )
  })
  it('should return the string if it is empty', () => {
    const emptyString = ''

    expect(capitaliseFirst(emptyString)).toBe(emptyString)
  })
  it('should capitalise a lower case first letter and ignore the case of the rest of the string', () => {
    const stringOne = 'hKuHkh'
    const stringTwo = 'wenXYhNDJLn'

    expect(capitaliseFirst(stringOne)).toBe('HKuHkh')
    expect(capitaliseFirst(stringTwo)).toBe('WenXYhNDJLn')
  })
})
