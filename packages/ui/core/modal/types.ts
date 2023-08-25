import type { ReactElement, ReactNode } from 'react'

export const MODAL_ATTR = ['container', 'header', 'content', 'footer', 'floating', 'floating2'] as const

export type RenderChildren = (props: { close: Function; closeAll: Function; callingProps?: CallingProps }) => JSX.Element | ReactNode

export type CompAttritube = {
  className?: string
  children?: RenderChildren
  // show?: boolean
}

export type ModalAttrKey = typeof MODAL_ATTR[number]

export type ModalAttr = {
  [Key in ModalAttrKey]?: CompAttritube | boolean
}

export type ModalInit<A> = {
  [ACTIONS in keyof A]: ModalAttr
}

export interface CreateModalOptions {
  onOpen?: () => void
  onClose?: () => void
}

export type InstanceType = (props: ModalProps) => JSX.Element

export interface CallingProps {
  /** @description Modal唯一值 畫面上不會同時有兩個同id的Modal存在 留空則不會判斷 */
  id?: string
  title?: string
  content?: string
  errorCode?: number
  denyCloseOnDismiss?: boolean
  onDismiss?: Function
  // dismiss?: boolean,
  classNames?: {
    [Key in ModalAttrKey]?: string
  }
  render?: {
    [Key in ModalAttrKey]?: RenderChildren
  }

  // TODO button types
  buttons?: any
  /** @description 可以放任意東西, 可以在children內的callingProps取用*/
  additional?: any
}

export type CallableModalType = (props?: CallingProps) => Promise<any>

export type CreatePropsType = {
  Instance: InstanceType
  initAttr: ModalAttr
  callingProps: CallingProps
}

export type CreateType = (props: CreatePropsType, options?: CreateModalOptions) => Promise<any>

export type CallableModalTypes<A> = {
  [ACTIONS in keyof A]: CallableModalType
}

export type CloseModal = (mode: 'single' | 'all') => (event: any) => void

export interface ModalProps {
  // isOpen?: boolean
  callingProps?: CallingProps
  attr?: ModalAttr
  closeModal: CloseModal
  children?: ReactNode
}

export type Variants<V> = {
  [variant in keyof V]: ModalAttr
}

export interface CoreModalReactInstanceProps<A> {
  show?: boolean
  onDismiss?: Function
  variant: keyof A
  callingProps?: CallingProps
}
export type CoreModalReactInstance<A> = (props: CoreModalReactInstanceProps<A>) => JSX.Element
