type IMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface IMockData {
  method?: IMethod
  timeout?: number
  response?: () => any
}

export type IApiInit = {
  url: string
  method?: IMethod
  mock?: IMockData
}

export type ApiType<TRes> = {
  query: { [key: string]: string | number } | null,
  body: { [key: string]: any } | null,
  res: TRes
}

export type Request<TQuery, TBody> = {
  [k in keyof RequestInit]: k extends 'body' ? TBody : RequestInit[k]
} & {
  query?: TQuery
}
