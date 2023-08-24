import Base from '../base'
import type * as Types from './types'

const prefix = '/api'
class Server extends Base {
  constructor() {
    super({ API_KEY: '' })
  }

  getContacts = this.apiGenerator<Types.IContacts>({ url: `${prefix}/contacts` })
}

export default new Server()
