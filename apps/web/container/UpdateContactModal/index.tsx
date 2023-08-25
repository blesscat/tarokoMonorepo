import { Modal, Button, Input } from 'ui'
import { toast } from 'react-toastify'
import { server } from 'api'
import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import { useForm } from 'react-hook-form'

import { useContactsStore } from '@/store'
import { IContact } from 'api/server/types'

export default function UpdateContactModal(props: { show: boolean, id: number, onClose: () => void }) {
  const { show, id, onClose } = props
  const { register, handleSubmit } = useForm()

  const updateContact = useContactsStore((state) => state.updateContact)
  const { trigger, isMutating, data: updateContactData } = useSWRMutation('server.swrUpateContacts', server.swrUpdateContact)

  const success = () => toast.success('update contact success!', {
    autoClose: 3000
  })

  const error = () => toast.error('update contact error!', {
    autoClose: 3000
  })

  const needValue = () => toast.warning('at least one value.', {
    autoClose: 3000
  })

  const patchContact = async (data: IContact) => {
    const hasValue = Object.values(data).some(key => key !== '')
    if (!hasValue) return needValue()

    const res = await trigger({
      path: String(id),
      body: {
        info: {
          ...(data.first_name && { first_name: data.first_name }),
          ...(data.last_name && { last_name: data.last_name }),
          ...(data.job && { job: data.job }),
          ...(data.description && { description: data.description }),
        }
      }
    })

    if (res.stasusCode === 201) success()
    else error()
    onClose()
  }

  useEffect(() => {
    if (!updateContactData?.data) return

    updateContact(updateContactData.data)
  }, [updateContactData?.data])


  return (
    <>
      <Modal show={show}>
        <div className='flex flex-col w-[400px] mx-3 p-3 bg-white rounded-md'>
          <form className='space-y-2' onSubmit={handleSubmit(data => patchContact(data as IContact))}>

            <Input {...register('first_name')} placeholder='first name' />
            <Input {...register('last_name')} placeholder='last_name' />
            <Input {...register('job')} placeholder='job' />
            <Input {...register('description')} placeholder='description' />

            <div className='grid grid-cols-2 mt-2 gap-2'>
              <Button className='h-9' loading={isMutating} type='submit'>
                submit
              </Button>
              <Button className='h-9' loading={isMutating} onClick={onClose}>
                cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
