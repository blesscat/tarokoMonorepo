import { useState, useMemo, useRef, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import ReactDOM from 'react-dom'

import createHeader from '../header'
import createContent from '../content'
import createFooter from '../footer'
import createFloating from '../floating'
import createFloating2 from '../floating2'

import style from '../../modal.module.scss'
import { getModelRoot, removeModalRootIfEmpty } from '../../utils'
import type { Variants, CoreModalReactInstanceProps, CompAttritube, ModalProps, CreateModalOptions } from '../../types'

const cg = (compAttribute?: CompAttritube | boolean) => {
  if (typeof compAttribute === 'boolean') return ''
  return compAttribute?.className
}

const showFloating = (compAttritube?: CompAttritube | boolean) => {
  if (!compAttritube) return false
  return !(Object.keys(compAttritube).length === 0 && compAttritube.constructor === Object)
}

const handleCloseModal = (_div: HTMLDivElement | null) => (_mode: 'single' | 'all') => (_event: any) => {
  // const handleCloseModal = (div: HTMLDivElement | null) => (mode: 'single' | 'all') => (event: any) => {
  /*
  div?.classList.add(style.remove)
  setTimeout(() => {
    div?.remove()
  }, 120)
  if (mode === 'single') removeModalRootIfEmpty()
  // else if (mode === 'all') removeModalRoot()
  // */
}

const createReactInstance =
  <A,>(variants: Variants<A>, options?: CreateModalOptions) =>
    (props: CoreModalReactInstanceProps<A>) => {
      const { variant, callingProps, onDismiss, show = false } = props
      const [dismiss, setDismiss] = useState(false)
      const divRef = useRef<HTMLDivElement>(null)
      const attr = useMemo(() => variants[variant], [variant])

      const components = useMemo(
        () => ({
          ...(showFloating(attr.floating) && { floating: createFloating(attr.floating) }),
          ...(showFloating(attr.floating2) && { floating2: createFloating2(attr.floating2) }),
          ...(attr.header && { header: createHeader(attr.header) }),
          ...(attr.content && { content: createContent(attr.content) }),
          ...(attr.footer && { footer: createFooter(attr.footer) })
        }),
        [variant]
      )

      const componentProps: ModalProps = {
        closeModal: handleCloseModal(divRef.current),
        callingProps
      }

      useEffect(() => {
        if (show && options?.onOpen) options.onOpen()

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
            className={twMerge(style.in, cg(attr?.container), callingProps?.classNames?.container, dismiss && style.shack)}
            ref={divRef}
          >
            {components.floating && <components.floating {...componentProps} />}
            {components.floating2 && <components.floating2 {...componentProps} />}
            {components.header && <components.header {...componentProps} />}
            {components.content && <components.content {...componentProps} />}
            {components.footer && <components.footer {...componentProps} />}
          </div>
        </>,
        getModelRoot()
      )
    }

export default createReactInstance
