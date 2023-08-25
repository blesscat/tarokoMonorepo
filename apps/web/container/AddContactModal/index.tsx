import { Modal, Button, Input } from 'ui'
import { server } from 'api'
import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import { useForm } from 'react-hook-form'

import { useContactsStore } from '@/store'

export default function AddContactModal(props: { show: boolean, onClose: () => void }) {
  const { show, onClose } = props
  const { register, handleSubmit, formState: { errors } } = useForm()

  const addContact = useContactsStore((state) => state.addContact)
  const { trigger, isMutating, data } = useSWRMutation('server.swrAddContacts', server.swrAddContact)

  useEffect(() => {
    if (!data?.data) return

    addContact(data.data)
  }, [data?.data])


  return (
    <Modal show={show}>
      <div className='flex flex-col w-[400px] mx-3 p-3 bg-white rounded-md'>
        <form className='space-y-2' onSubmit={handleSubmit(async data => {
          console.log(data)
          await trigger({
            body: {
              contact: {
                first_name: data.first_name,
                last_name: data.last_name,
                job: data.job,
                description: data.sescription
              }
            }
          })

          onClose()

        })}
        >

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
  )
}
