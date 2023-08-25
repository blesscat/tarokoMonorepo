import type { IApiInit, Request, ApiType } from './types'

const BASE_URL = 'http://localhost:3000'

export default class Base {
  private baseUrl: string | number
  private apiPrefix: string
  private headers: { [key: string]: string } = {}

  constructor({ API_KEY, API_PREFIX }: { API_KEY: string, API_PREFIX?: string }) {

    this.baseUrl = ''
    this.apiPrefix = API_PREFIX || ''

    try {
      const baseUrl = BASE_URL
      if (!baseUrl) throw ('[missing a certain API_KEY]')

      this.baseUrl = baseUrl

    } catch (e) {
      console.error(e, `missing ${API_KEY} at window._env_`)
    }
  }

  private genParams<TQuery>(params?: TQuery) {
    if (!params) return ''
    const urlParams = new URLSearchParams(params as unknown as URLSearchParams).toString()
    return `?${urlParams}`
  }

  setHeaders(callback: (headers: typeof this.headers) => typeof this.headers) {
    const headers = callback(this.headers)
    this.headers = headers
  }

  protected swrApiGenerator<T extends ApiType<T['res']>>({ url, method }: IApiInit) {
    return async (_url_: string, { arg }: Readonly<{ arg?: { body?: T['body'], query?: T['query'], path?: string } }>) => {
      const _path = arg?.path ? `/${arg.path}` : ''
      const _url = `${this.baseUrl}${this.apiPrefix}${url}${_path}${this.genParams(arg?.query)}`
      const _method = method || 'get'

      const getBody = () => {
        if (method === 'get') return null
        return arg?.body
      }

      const res = await fetch(_url, {
        method: _method,
        headers: {
          'Content-type': 'application/json',
          ...this.headers
        },
        ...(getBody() && { body: JSON.stringify(getBody()) })
      })

      return await res.json()
    }
  }

  protected apiGenerator<T extends ApiType<T['res']>>({ url, method }: IApiInit): (req?: Request<T['query'], T['body']>, options?: any) => Promise<T['res']> {

    return async (request?: Request<T['query'], T['body']>, options?: any) => {
      const _method = request?.method || method || 'get'
      const _request = { ...request, body: null }

      const getBody = () => {
        if (_method === 'get') return null
        return request?.body
      }

      const _url = `${this.baseUrl}${this.apiPrefix}${url}${this.genParams(request?.query)}`

      const res = await fetch(_url, {
        ..._request,
        method: _method,
        headers: {
          'Content-type': 'application/json',
          ...this.headers,
          ...request?.headers
        },
        ...options,
        ...(getBody() && { body: JSON.stringify(getBody()) })
      })

      return await res.json()
    }
  }
}
