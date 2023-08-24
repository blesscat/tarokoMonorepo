import { Button, Header } from 'ui'
import { server } from 'api'
import Test from './test'
import styles from './test.module.scss'

console.log('api', server.getContacts())

export default async function Page() {
  const contacts = await server.getContacts()
  console.log(contacts.data, contacts.statusCode)
  return (
    <>
      <Header />
      <Button />
      <Test />
    </>
  )
}
