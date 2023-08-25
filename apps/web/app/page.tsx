import { server } from 'api'

import Header from './componets/Header'

console.log('api', server.getContacts())

export default async function Page() {
  const contacts = await server.getContacts()
  console.log(contacts.data, contacts.statusCode)
  return (
    <>
      <Header />
    </>
  )
}
