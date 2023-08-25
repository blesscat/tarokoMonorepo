import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from 'ui'

import AddContactModal from '@/container/AddContactModal'

export default function SideBar(props: { show: boolean, onClose: () => void }) {
  const { show, onClose } = props
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {show &&
        <div>
          <motion.div className='fixed inset-0 bg-black z-20'
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
          >
          </motion.div>
          <motion.div className='fixed z-[21] bg-white top-0 h-screen w-52'
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ type: 'just' }}
          >
            <div className='flex flex-col w-full p-3'>
              <Button onClick={() => {
                setShowModal(true)
                onClose()
              }}>
                Add Contact
              </Button>
            </div>
          </motion.div>
        </div>
      }
      <AddContactModal show={showModal} onClose={() => setShowModal(false)} />
    </>

  )

}
