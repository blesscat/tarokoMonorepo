import { twMerge } from 'tailwind-merge'
import { genClassName } from '../utils'

import type { CallingProps, CloseModal, CompAttritube, ModalProps, RenderChildren } from '../../types'

const Content = (props: { children: RenderChildren | false; callingProps?: CallingProps; closeModal: CloseModal }) => {
  const { children, callingProps, closeModal } = props
  const callbackProps = { close: closeModal('single'), closeAll: closeModal('all'), callingProps }

  if (callingProps?.render?.header) return <> {callingProps.render.header(callbackProps)} </>
  else if (children) return <> {children(callbackProps)} </>
  else return <>{callingProps?.title}</>
}

const createHeader = (init?: CompAttritube | true) => {
  const { initClassName, children } = genClassName(init)

  return (props: ModalProps) => {
    const { closeModal, callingProps } = props

    return (
      <div data-cid='CoreModal__Header' className={twMerge(initClassName, callingProps?.classNames?.header)}>
        <Content children={children} callingProps={callingProps} closeModal={closeModal} />
      </div>
    )
  }
}

export default createHeader
