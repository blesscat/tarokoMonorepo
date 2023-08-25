import { twMerge } from 'tailwind-merge'
import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { getModelRoot, removeModalRootIfEmpty } from './utils'
import style from './modal.module.scss'

export default function Modal(props: { show: boolean, onDismiss?: () => void, children?: JSX.Element }) {
  const { show, onDismiss, children } = props
  const [dismiss, setDismiss] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // if (show && options?.onOpen) options.onOpen()

    if (!show) {
      divRef?.current?.classList.add(style.remove)
      setTimeout(removeModalRootIfEmpty, 120)
    }
    return () => removeModalRootIfEmpty()
  }, [show])

  const handleClick = () => {
    if (onDismiss) onDismiss()
    else {
      if (dismiss) setDismiss(false)
      setTimeout(() => {
        setDismiss(true)
      })
    }
  }

  if (!show) return <></>

  return ReactDOM.createPortal(
    <>
      <div className='fixed left-0 right-0 top-0 bottom-0' onClick={handleClick} />
      <div
        data-cid='CoreModal__Container'
        className={twMerge(style.in, dismiss && style.shack)}
        ref={divRef}
      >
        {children}
      </div>
    </>,
    getModelRoot()
  )
}
