import { cloudinary } from './cloudinary'
import { getImgUrl } from './get-url'

jest.mock('./cloudinary', () => ({
  cloudinary: {
    ...jest.requireActual('cloudinary'),
    url: jest.fn(),
  },
}))

describe('getImgUrl', () => {
  it('should call cloudinary.url with the correct path and return the returned value of the fn', () => {
    const remoteImgUrl = 'https://url.com'
    const urlMock = jest.mocked(cloudinary).url.mockReturnValue(remoteImgUrl)
    const publicId = 'testId'

    const result = getImgUrl(publicId)

    expect(urlMock).toHaveBeenCalledWith('outsourcd/testId')
    expect(result).toBe(remoteImgUrl)
  })
})
