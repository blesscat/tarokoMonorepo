import Base from '../base'
import type * as Types from './types'

const prefix = '/api'
class Server extends Base {
  constructor() {
    super({ API_KEY: '' })
  }

  getContacts = this.apiGenerator<Types.IGetContacts>({ url: `${prefix}/contacts` })

  swrGetContacts = this.swrApiGenerator<Types.IGetContacts>({ url: `${prefix}/contacts` })
  swrAddContact = this.swrApiGenerator<Types.IAddContacts>({ url: `${prefix}/contacts`, method: 'POST' })
  swrDelContact = this.swrApiGenerator<Types.IDelContact>({ url: `${prefix}/contacts`, method: 'DELETE' })
  swrUpdateContact = this.swrApiGenerator<Types.IUpdateContact>({ url: `${prefix}/contacts`, method: 'PATCH' })
}

export default new Server()
