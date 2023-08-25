import { server } from 'api'

import Header from './Header'
import Title from './Title'
import Contacts from './Contacts'

export default async function Page() {
  const contacts = await server.getContacts({ query: { t: Date.now() } })

  return (
    <>
      <Header />
      <Title />
      <main>
        <Contacts contacts={contacts?.data} />
      </main>
    </>
  )
}
