export class HTTPError extends Error {
  readonly response: unknown
  readonly status: number
  readonly statusText: string

  constructor(status: number, statusText: string, response: unknown) {
    super(statusText)
    this.status = status
    this.statusText = statusText
    this.response = response
  }
}
