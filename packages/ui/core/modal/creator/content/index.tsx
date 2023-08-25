import { twMerge } from 'tailwind-merge'
import { genClassName } from '../utils'

import type { CompAttritube, ModalProps, RenderChildren, CloseModal, CallingProps } from '../../types'

const Content = (props: { children: RenderChildren | false; callingProps?: CallingProps; closeModal: CloseModal }) => {
  const { children, callingProps, closeModal } = props
  const callbackProps = { close: closeModal('single'), closeAll: closeModal('all'), callingProps }

  if (callingProps?.render?.content) return <> {callingProps.render.content(callbackProps)} </>
  else if (children) return <> {children(callbackProps)} </>
  else return <> {callingProps?.content} </>
}

const createContent = (init?: CompAttritube | true) => {
  const { initClassName, children } = genClassName(init)

  return (props: ModalProps) => {
    const { closeModal, callingProps } = props

    return (
      <div data-cid='CoreModal__Content' className={twMerge(initClassName, callingProps?.classNames?.content)}>
        <Content children={children} callingProps={callingProps} closeModal={closeModal} />
      </div>
    )
  }
}

export default createContent
