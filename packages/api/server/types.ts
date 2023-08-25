
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

export interface IGetContacts {
  query: null | { t?: number }
  body: null
  res: WithData<IContact[]>
}

export interface IAddContacts {
  query: null
  body: {
    contact: Omit<IContact, 'id'>
  }
  res: WithData<IContact>
}

export interface IDelContact {
  query: { id: number }
  body: null
  res: WithData<IContact>

}
