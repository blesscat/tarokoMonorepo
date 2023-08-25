import { create } from 'zustand'
import type { IContact } from 'api/server/types'

interface ContactsState {
  contacts: IContact[]
  addContact: (contact: IContact) => void
}

export const userContactsStore = create<ContactsState>((set) => ({
  contacts: [],
  addContact: (contact: IContact) => set((state) => ({ contacts: [...state.contacts, contact] }))
}))
