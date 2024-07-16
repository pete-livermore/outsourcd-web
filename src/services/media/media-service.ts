import { HTTPError } from '@/errors/http-error'
import { IApiClient } from '@/lib/api/client/api-client'
import { Result } from '@/types/result/result'
import { logger } from '@/utils/logging/logger'

interface FileUploadOptions {
  name: string
  ext?: string
}

interface FileUploadResponse {
  id: number
}

export class MediaService {
  private static instance: MediaService

  private constructor(private readonly apiClient: IApiClient) {
    this.apiClient = apiClient
  }

  public static getInstance(apiClient: IApiClient) {
    if (!MediaService.instance) {
      MediaService.instance = new MediaService(apiClient)
    }
    return MediaService.instance
  }

  async upload(
    blob: Blob,
    { name, ext }: FileUploadOptions,
  ): Promise<Result<FileUploadResponse>> {
    const fileOriginalName = name + '.' + ext

    const newForm = new FormData()
    newForm.append('file', blob, fileOriginalName)
    newForm.append('provider', 'cloudinary')
    newForm.append('name', name)

    try {
      const { data } = await this.apiClient.post<{ data: FileUploadResponse }>(
        '/api/v1/uploads/file',
        {
          body: newForm,
        },
      )
      return {
        type: 'success',
        data,
      }
    } catch (e) {
      logger.error(e)
      if (e instanceof HTTPError && e.status === 401) {
        return {
          type: 'failure',
          reason: 'auth-error',
        }
      }
      return {
        type: 'failure',
        reason: 'server-error',
      }
    }
  }
}
