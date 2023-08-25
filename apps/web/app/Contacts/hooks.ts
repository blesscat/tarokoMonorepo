'use client'

import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import { server } from 'api'

import { useContactsStore } from '@/store'

export const useDelContact = () => {
  const delContact = useContactsStore(state => state.delContact)
  const { isMutating, data, trigger } = useSWRMutation('server.swrDelContact', server.swrDelContact)

  useEffect(() => {
    if (!data?.data) return

    delContact(data.data.id)
  }, [data?.data])

  return {
    trigger,
    isMutating
  }
}
