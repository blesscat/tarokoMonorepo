'use client'
import { BsSortAlphaDown, BsSortAlphaDownAlt } from 'react-icons/bs'
import { Ripple } from 'ui'
import { useContactsStore } from '@/store'

export default function Title() {
  const state = useContactsStore()

  return (
    <div className='relative flex items-center justify-center h-9 font-bold text-2xl mt-3'>
      <span> Contacts </span>
      <Ripple className='!absolute right-10 rounded-full p-1' onClick={state.tiggleSort}>
        {
          state.sort === 'ascending' ? <BsSortAlphaDown /> : <BsSortAlphaDownAlt />
        }
      </Ripple>
    </div>

  )
}
