import { Modal, Button, Input } from 'ui'
import { toast } from 'react-toastify'
import { server } from 'api'
import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import { useForm } from 'react-hook-form'

import { useContactsStore } from '@/store'
import { IContact } from 'api/server/types'

export default function AddContactModal(props: { show: boolean, onClose: () => void }) {
  const { show, onClose } = props
  const { register, handleSubmit, formState: { errors } } = useForm()

  const addContact = useContactsStore((state) => state.addContact)
  const { trigger, isMutating, data: addContactData } = useSWRMutation('server.swrAddContacts', server.swrAddContact)

  const success = () => toast.success('add contact success!', {
    autoClose: 3000
  })

  const error = () => toast.error('add contact failure!', {
    autoClose: 3000
  })

  const postContact = async (data: IContact) => {
    const res = await trigger({
      body: {
        contact: {
          first_name: data.first_name,
          last_name: data.last_name,
          job: data.job,
          description: data.description
        }
      }
    })

    if (res.statusCode === 201) success()
    else error()
    onClose()
  }

  useEffect(() => {
    if (!addContactData?.data) return

    addContact(addContactData.data)
  }, [addContactData?.data])


  return (
    <>
      <Modal show={show}>
        <div className='flex flex-col w-[80vw] max-w-[400px] mx-3 p-3 bg-white rounded-md'>
          <form className='space-y-2' onSubmit={handleSubmit(data => postContact(data as IContact))}>

            <Input {...register('first_name', { required: true })} placeholder='first name' error={errors?.first_name && 'required'} />
            <Input {...register('last_name', { required: true })} placeholder='last_name' error={errors?.last_name && 'required'} />
            <Input {...register('job', { required: true })} placeholder='job' error={errors?.job && 'required'} />
            <Input {...register('description', { required: true })} placeholder='description' error={errors?.description && 'required'} />

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
