'use client'
import { useMemo, useEffect, useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { Button } from 'ui'

import { useContactsStore } from '@/store'
import UpdateContactModal from '@/container/UpdateContactModal'

import { useDelContact, useDuplicateContact } from './hooks'
import type { IContact } from 'api/server/types'

const Contact = ({ contact }: { contact: IContact }) => {
  const [showEdit, setShowEdit] = useState(false)
  const { duplicateContact, loading: duplicataLoading } = useDuplicateContact(contact)
  const { trigger: delContact, success, error } = useDelContact()

  const handleDelContact = async () => {
    const res = await delContact({ path: String(contact.id) })
    if (res.statusCode === 200) success(contact)
    else error(contact)
  }

  return (
    <>
      <div className='p-3 border shadow w-full'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <BsFillPersonFill className='mr-2' color='#4c9eea' size='2rem' />
            <div> {`${contact.first_name} ${contact.last_name}`} </div>
          </div>

          <div className='flex'>
            <Button variant='icon' loading={duplicataLoading} onClick={duplicateContact}>
              <HiOutlineDocumentDuplicate color='#666666' size='1rem' />
            </Button>
            <div className='flex flex-col space-y-2'>
              <Button variant='primaryXs' onClick={() => setShowEdit(true)}> Edit </Button>
              <Button variant='primaryXs' onClick={handleDelContact}> Delete </Button>
            </div>
          </div>
        </div>

        <div className='text-xs mt-1'>
          {`Job: ${contact.job}`}
        </div>
        <div className='text-xs mt-1'>
          {`Description: ${contact.description}`}
        </div>
      </div>
      <UpdateContactModal show={showEdit} id={contact.id} onClose={() => setShowEdit(false)} />
    </>
  )
}

export default function Contacts({ contacts }: { contacts: IContact[] }) {
  const state = useContactsStore()

  useEffect(() => state.setContacts(contacts), [contacts])

  const _contacts = useMemo(() => {
    const _contacts = state.init ? state.contacts : contacts

    if (state.sort === 'ascending') return _contacts.sort((a, b) => a.first_name > b.first_name ? 1 : -1)
    else return _contacts.sort((a, b) => a.first_name > b.first_name ? -1 : 1)
  }, [state.sort, state.contacts, contacts])

  return (
    <div className='grid gap-3 px-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
      {
        _contacts.map(contact => <Contact contact={contact} key={contact.id} />)
      }
    </div>
  )
}
