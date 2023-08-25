'use client'

import { Ripple, Button } from 'ui'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import { BsList } from 'react-icons/bs'
import styles from './header.module.scss'

const Menu = ({ className }: { className?: string }) => {
  return (
    <Ripple className={twMerge('rounded-lg', className)}>
      <BsList size='2rem' />
    </Ripple>
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
      <Ripple className='flex flex-1 justify-center px-1 rounded-lg font-bold' onClick={() => router.push('/')}>Contact List</Ripple>
    </div>
  )
}

const AddContact = ({ className }: { className?: string }) => {
  return (
    <Button variant='primary' className={className} onClick={() => console.log('add conact')}> Add Contact </Button>
  )
}

export default function Header() {
  return (
    <header className={twMerge(styles.container, 'px-0 sm:px-3')}>
      <Menu className='flex sm:hidden' />
      <Logo />
      <AddContact className='hidden sm:flex' />
    </header>
  )
}
