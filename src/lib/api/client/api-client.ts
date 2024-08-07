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
  patch<T>(urlPath: string, data: unknown): Promise<T>
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
    }
  }

  private async makeRequest(path: string, init?: RequestInit) {
    return fetch(this.url + path, {
      ...init,
      headers: this.mergeHeaders(init?.headers),
    })
  }

  private async handleResponse<T>(res: Response) {
    const responseBody: JSONResponse<T> = await res.json()

    if (!res.ok) {
      throw new HTTPError(res.status, res.statusText, responseBody)
    }

    return responseBody as T
  }

  async get<T>(path: string): Promise<T> {
    const res = await this.makeRequest(path)
    return this.handleResponse(res)
  }

  private getPayloadData(data: unknown) {
    if (data instanceof FormData) {
      return { body: data }
    } else {
      const headers = { 'Content-Type': 'application/json' }
      return { body: JSON.stringify(data), headers }
    }
  }

  async post<T>(path: string, data: unknown): Promise<T> {
    const { body, headers } = this.getPayloadData(data)

    const res = await this.makeRequest(path, {
      method: 'POST',
      body,
      headers,
    })

    return this.handleResponse(res)
  }

  async put<T>(path: string, data: unknown): Promise<T> {
    const { body, headers } = this.getPayloadData(data)

    const res = await this.makeRequest(path, {
      method: 'PUT',
      body,
      headers,
    })

    return this.handleResponse(res)
  }

  async patch<T>(path: string, data: unknown): Promise<T> {
    const { body, headers } = this.getPayloadData(data)

    const res = await this.makeRequest(path, {
      method: 'PATCH',
      body,
      headers,
    })

    return this.handleResponse(res)
  }
}
