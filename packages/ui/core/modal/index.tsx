import ReactDOM from 'react-dom'
import { initArrtibute } from './attributes'

import { getModelRoot, removeModalRootIfEmpty, removeModalRoot, mergeModalAttributesWithDefault, createInstanceContainer } from './utils'

import type {
  ModalInit,
  ModalAttr,
  CreateType,
  CallableModalTypes,
  CallingProps,
  CoreModalReactInstance,
  CreateModalOptions
} from './types'

import createReactInstance from './creator/reactInstance/'

import creactInstance from './creator/instance'
import style from './modal.module.scss'

const handleCloseModal = (div: HTMLDivElement, resolve: any, onClose?: () => void) => (mode: 'single' | 'all') => (event: any) => {
  resolve(event)
  div.classList.add(style.remove)
  setTimeout(() => {
    div.remove()
    if (mode === 'single') removeModalRootIfEmpty()
  }, 120)
  if (mode === 'single') removeModalRootIfEmpty(true)
  else if (mode === 'all') removeModalRoot(true)
  if (onClose) onClose()
}

const create: CreateType = (props, options?) =>
  new Promise(resolve => {
    const { Instance, initAttr, callingProps } = props
    const container = getModelRoot()
    const div = createInstanceContainer(callingProps.id)
    if (!div) return <></>

    container.appendChild(div)
    if (options?.onOpen) options.onOpen()
    ReactDOM.render(
      <Instance attr={initAttr} closeModal={handleCloseModal(div, resolve, options?.onClose)} callingProps={callingProps} />,
      div
    )
  })

export const createModal = <A,>(init: ModalInit<A>, options?: CreateModalOptions) => {
  const variants = mergeModalAttributesWithDefault(initArrtibute, init)

  const genActions = () => {
    const obj: any = {}
    for (const [action, initAttr] of Object.entries(variants)) {
      const _initAttr = initAttr as ModalAttr
      const instance = creactInstance(_initAttr)
      obj[action] = (callingProps: CallingProps) => create({ Instance: instance, initAttr: _initAttr, callingProps }, options)
    }
    return obj
  }

  return {
    ...genActions(),
    Instance: createReactInstance(variants, options)
  } as CallableModalTypes<A> & { Instance: CoreModalReactInstance<A> }
}
