'use client'
import { useState } from 'react'
import { BsList } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import { Ripple, Button } from 'ui'

import AddContactModal from '@/container/AddContactModal'
import SideBar from '@/container/SideBar'
import styles from './header.module.scss'

const Menu = ({ className }: { className?: string }) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className={twMerge('relative', className)}>
      <Ripple className='rounded-lg' onClick={() => setShowMenu(true)}>
        <BsList size='2rem' />
      </Ripple>

      <SideBar show={showMenu} onClose={() => setShowMenu(false)} />
    </div>
  )
}

const Logo = ({ className }: { className?: string }) => {
  const router = useRouter()

  return (
    <div className={twMerge(
      'flex items-center w-full absolute pointer-events-none h-7',
      'sm:w-auto sm:relative sm:pointer-events-auto',
      className)}
    >
      <Ripple className='flex flex-1 justify-center px-1 rounded-lg font-bold' onClick={() => router.push('/')}>
        <h1> Contact List </h1>
      </Ripple>
    </div>
  )
}


const AddContact = ({ className }: { className?: string }) => {
  const [show, setShow] = useState(false)

  return (
    <div className={className}>
      <Button variant='primary' onClick={() => setShow(true)}> Add Contact </Button>
      <AddContactModal show={show} onClose={() => setShow(false)} />
    </div>
  )
}

export default function Header() {
  return (
    <div className='relative'>
      <header className={twMerge(styles.container, 'px-0 sm:px-3')}>
        <Menu className='flex sm:hidden' />
        <Logo />
        <AddContact className='hidden sm:flex' />
      </header>
      <div className='h-[40px]' />
    </div>
  )
}
