'use client'

import { useEffect } from 'react'
import { toast } from 'react-toastify'
import useSWRMutation from 'swr/mutation'
import { server } from 'api'

import type { IContact } from 'api/server/types'
import { useContactsStore } from '@/store'

export const useDelContact = () => {
  const delContact = useContactsStore(state => state.delContact)
  const { isMutating, data, trigger } = useSWRMutation('server.swrDelContact', server.swrDelContact)

  const success = (contact: IContact) => toast.success(`del ${contact.first_name} ${contact.last_name} success!`, {
    autoClose: 3000
  })

  const error = (contact: IContact) => toast.error(`del ${contact.first_name} ${contact.last_name} failure!`, {
    autoClose: 3000
  })

  useEffect(() => {
    if (!data?.data) return

    delContact(data.data.id)
  }, [data?.data])

  return {
    trigger,
    isMutating,
    success,
    error
  }
}
