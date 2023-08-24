
export interface WithData<T> {
  statusCode: number
  message: string
  data: T
}

export interface IContact {
  id: number
  first_name: string
  last_name: string
  job: string
  description: string
}

export interface IContacts {
  query: null
  body: null
  res: WithData<IContact[]>
}
