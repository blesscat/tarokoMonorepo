import Base from '../base'
import type * as Types from './types'

const prefix = '/api'
class Server extends Base {
  constructor() {
    super({ API_KEY: '' })
  }

  getContacts = this.apiGenerator<Types.IGetContacts>({ url: `${prefix}/contacts` })
  swrGetContacts = this.swrApiGenerator<Types.IGetContacts>({ url: `${prefix}/contacts` })

  swrAddContact = this.swrApiGenerator<Types.IAddContacts>({ url: `${prefix}/contacts`, method: 'post' })
  swrDelContact = this.swrApiGenerator<Types.IDelContact>({ url: `${prefix}/contacts`, method: 'delete' })
}

export default new Server()
