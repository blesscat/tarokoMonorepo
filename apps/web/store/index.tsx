import { create } from 'zustand'
import type { IContact } from 'api/server/types'

interface ContactsState {
  init: boolean
  sort: 'ascending' | 'descending'
  contacts: IContact[]
  tiggleSort: () => void
  setContacts: (contacts: IContact[]) => void
  addContact: (contact: IContact) => void
  delContact: (id: number) => void
}

export const useContactsStore = create<ContactsState>((set) => ({
  init: false,
  sort: 'ascending',
  contacts: [],
  tiggleSort: () => set((state) => {
    if (state.sort === 'ascending') return { ...state, sort: 'descending' }
    else return { sort: 'ascending' }
  }),
  setContacts: (contacts: IContact[]) => set((state) => ({ ...state, init: true, contacts })),
  addContact: (contact: IContact) => set((state) => ({ ...state, contacts: [...state.contacts, contact] })),
  delContact: (id: number) => set((state) => ({ ...state, contacts: [...state.contacts.filter(contact => contact.id !== id)] }))
}))


