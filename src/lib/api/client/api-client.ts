import { HTTPError } from '@/errors/http-error'

type JSONResponse<T> = {
  data?: T
  errors?: Array<{ message: string }>
}

export interface IApiClient {
  get<T>(urlPath: string): Promise<T>
  post<T>(urlPath: string, data: unknown): Promise<T>
}

interface Deps {
  url: string
  token?: string
}

interface AuthHeader {
  Authorization?: string
}

export class ApiClient implements IApiClient {
  private readonly url: string
  private authHeader: AuthHeader = {}

  constructor({ url, token }: Deps) {
    this.url = url
    if (token) {
      this.authHeader['Authorization'] = `Bearer ${token}`
    }
  }

  async get<T>(path: string): Promise<T> {
    const res = await fetch(this.url + path, {
      headers: {
        ...this.authHeader,
      },
    })

    const responseBody: JSONResponse<T> = await res.json()

    if (!res.ok) {
      throw new HTTPError(res.status, res.statusText, responseBody)
    }

    if (!responseBody.data) {
      throw new HTTPError(500, 'Internal Server Error', responseBody)
    }

    return responseBody.data
  }

  async post<T>(path: string, data: unknown): Promise<T> {
    const res = await fetch(this.url + path, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...this.authHeader,
      },
    })

    const responseBody = await res.json()

    if (!res.ok) {
      throw new HTTPError(res.status, res.statusText, responseBody)
    }

    return responseBody as T
  }
}
