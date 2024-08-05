import { env } from '@/config/env'
import { HTTPError } from '@/errors/http-error'

type JSONResponse<T> = {
  data?: T
  errors?: Array<{ message: string }>
}

export interface IApiClient {
  get<T>(urlPath: string): Promise<T>
  post<T>(urlPath: string, data: unknown): Promise<T>
  put<T>(urlPath: string, data: unknown): Promise<T>
}

interface AuthHeader {
  Authorization?: string
}

export class ApiClient implements IApiClient {
  private readonly url: string
  private authHeader: AuthHeader = {}

  constructor(token?: string) {
    this.url = env.SERVER_URL
    if (token) {
      this.authenticate(token)
    }
  }

  private authenticate(token: string) {
    this.authHeader['Authorization'] = `Bearer ${token}`
  }

  private mergeHeaders(customHeaders?: HeadersInit): HeadersInit {
    return {
      ...customHeaders,
      ...this.authHeader,
      'Content-Type': 'application/json',
    }
  }

  private async makeRequest(path: string, options?: RequestInit) {
    return fetch(this.url + path, {
      ...options,
      headers: this.mergeHeaders(options?.headers),
    })
  }

  async get<T>(path: string): Promise<T> {
    const res = await this.makeRequest(path)

    const responseBody: JSONResponse<T> = await res.json()

    if (!res.ok) {
      throw new HTTPError(res.status, res.statusText, responseBody)
    }

    return responseBody as T
  }

  async post<T>(path: string, data: unknown): Promise<T> {
    const res = await this.makeRequest(path, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const responseBody = await res.json()

    if (!res.ok) {
      throw new HTTPError(res.status, res.statusText, responseBody)
    }

    return responseBody as T
  }

  async put<T>(path: string, data: unknown): Promise<T> {
    const res = await this.makeRequest(path, {
      method: 'PUT',
      body: JSON.stringify(data),
    })

    const responseBody = await res.json()

    if (!res.ok) {
      throw new HTTPError(res.status, res.statusText, responseBody)
    }

    return responseBody as T
  }
}
