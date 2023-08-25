import { twMerge } from 'tailwind-merge'
import { genClassName } from '../utils'

import type { CompAttritube, ModalProps, RenderChildren, CloseModal, CallingProps } from '../../types'

const Content = (props: { children: RenderChildren | false; callingProps?: CallingProps; closeModal: CloseModal }) => {
  const { children, callingProps, closeModal } = props
  const callbackProps = { close: closeModal('single'), closeAll: closeModal('all'), callingProps }

  if (callingProps?.render?.floating) return <> {callingProps.render.floating(callbackProps)} </>
  else if (children) return <> {children(callbackProps)} </>
  else return <div className='text-red-900'>replace me with children</div>
}

const createFloating = (init?: CompAttritube | boolean) => {
  const { initClassName, children } = genClassName(init)

  return (props: ModalProps) => {
    const { closeModal, callingProps } = props

    return (
      <div data-cid='CoreModal__Floating' className={twMerge('absolute', initClassName, callingProps?.classNames?.floating)}>
        <Content children={children} callingProps={callingProps} closeModal={closeModal} />
      </div>
    )
  }
}

export default createFloating
