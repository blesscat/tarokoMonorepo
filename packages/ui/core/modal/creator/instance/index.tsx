import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import createHeader from '../header'
import createContent from '../content'
import createFooter from '../footer'
import createFloating from '../floating'
import createFloating2 from '../floating2'

import type { ModalProps, CompAttritube, ModalAttr } from '../../types'
import style from '../../modal.module.scss'

const cg = (compAttribute?: CompAttritube | boolean) => {
  if (typeof compAttribute === 'boolean') return ''
  return compAttribute?.className
}

const showFloating = (compAttritube?: CompAttritube | boolean) => {
  if (!compAttritube) return false
  return !(Object.keys(compAttritube).length === 0 && compAttritube.constructor === Object)
}

export const creactInstance = (initAttr: ModalAttr) => {
  const components = {
    ...(showFloating(initAttr.floating) && { floating: createFloating(initAttr.floating) }),
    ...(showFloating(initAttr.floating2) && { floating2: createFloating2(initAttr.floating2) }),
    ...(initAttr.header && { header: createHeader(initAttr.header) }),
    ...(initAttr.content && { content: createContent(initAttr.content) }),
    ...(initAttr.footer && { footer: createFooter(initAttr.footer) })
  }

  return (props: ModalProps) => {
    const { attr } = props
    const [show, setShow] = useState(false)

    const handleClick = () => {
      if (props.callingProps?.onDismiss) props.callingProps.onDismiss()
      if (props.callingProps?.denyCloseOnDismiss) {
        if (show) setShow(false)
        setTimeout(() => {
          setShow(true)
        })
      } else props.closeModal('single')('dismiss')
    }

    return (
      <>
        <div className='fixed left-0 right-0 top-0 bottom-0' onClick={handleClick} />
        <div data-cid='CoreModal_Container' className={twMerge(cg(attr?.container), show && style.shack)}>
          {components.floating && <components.floating {...props} />}
          {components.floating2 && <components.floating2 {...props} />}
          {components.header && <components.header {...props} />}
          {components.content && <components.content {...props} />}
          {components.footer && <components.footer {...props} />}
        </div>
      </>
    )
  }
}

export default creactInstance
