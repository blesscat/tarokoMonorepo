import { twMerge } from 'tailwind-merge'
import { genClassName } from '../utils'

import type { CompAttritube, ModalProps, RenderChildren, CloseModal, CallingProps } from '../../types'

const Content = (props: { children: RenderChildren | false; callingProps?: CallingProps; closeModal: CloseModal }) => {
  const { children, callingProps, closeModal } = props
  const callbackProps = { close: closeModal('single'), closeAll: closeModal('all'), callingProps }

  if (callingProps?.render?.footer) return <> {callingProps.render.footer(callbackProps)} </>
  else if (children) return <> {children(callbackProps)} </>
  else return <> </>
}

const createFooter = (init?: CompAttritube | true) => {
  const { initClassName, children } = genClassName(init)

  return (props: ModalProps) => {
    const { closeModal, callingProps } = props

    return (
      <div data-cid='CoreModal__Footer' className={twMerge(initClassName, callingProps?.classNames?.footer)}>
        <Content children={children} callingProps={callingProps} closeModal={closeModal} />
      </div>
    )
  }
}

export default createFooter
