'use client'
import { twMerge } from 'tailwind-merge'
import { useMemo, useEffect } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { Button } from 'ui'

import { useContactsStore } from '@/store'

import { useDelContact } from './hooks'
import type { IContact } from 'api/server/types'

const Contact = ({ contact }: { contact: IContact }) => {
  const { trigger: delContact } = useDelContact()

  return (
    <div className={twMerge(
      'p-3 border shadow w-full mt-3',
      'sm:max-w-[400px] sm:min-w-[400px] sm:mr-3'
    )}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <BsFillPersonFill color='#4c9eea' size='2rem' />
          <div> {`${contact.first_name} ${contact.last_name}`} </div>
        </div>

        <div className='flex flex-col space-y-2'>
          <Button variant='primaryXs' onClick={() => console.log('edit')}> Edit </Button>
          <Button variant='primaryXs' onClick={() => delContact({ path: String(contact.id) })}> Delete </Button>
        </div>
      </div>

      <div className='text-xs mt-1'>
        {`Job: ${contact.job}`}
      </div>
      <div className='text-xs mt-1'>
        {`Description: ${contact.description}`}
      </div>
    </div>
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
    <div className='flex flex-wrap px-3'>
      {
        _contacts.map(contact => <Contact contact={contact} key={contact.id} />)
      }
    </div>
  )
}
