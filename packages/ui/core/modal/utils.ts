import { twMerge } from 'tailwind-merge'

import { MODAL_ATTR } from './types'
import type { ModalInit, ModalAttr, CompAttritube, ModalAttrKey } from './types'
import { defaultAttribute } from './attributes'
import style from './modal.module.scss'

export const CONTAINER_ID = 'CoreModal__Root'

export const getModelRoot = () => {
  let container = document.getElementById(CONTAINER_ID)
  if (container) return container

  container = document.createElement('div')
  container.setAttribute('id', CONTAINER_ID)
  container.className = style.container
  document.body.appendChild(container)
  document.body.style.overflow = 'hidden'
  return container
}

export const removeModalRootIfEmpty = (delay?: boolean) => {
  setTimeout(
    () => {
      const container = document.getElementById(CONTAINER_ID)
      const hasChildren = !!container?.hasChildNodes()
      if (!hasChildren) {
        container?.remove()
        document.body.style.overflow = 'auto'
      }
    },
    delay ? 120 : 0
  )
}

export const removeModalRoot = (delay?: boolean) => {
  setTimeout(
    () => {
      const container = document.getElementById(CONTAINER_ID)
      if (container) {
        container.remove()
        document.body.style.overflow = 'auto'
      }
    },
    delay ? 120 : 0
  )
}

const arrageComponents = <A>(props: ModalInit<A>[], unionKeys: Set<string>): { [ACTIONS in keyof A]: ModalAttr } => {
  let dict: any = {}
  for (const key of Array.from(unionKeys.values())) {
    const targets = Array.from(props, (attr: any) => attr[key])
      .filter(x => !!x)
      .flat()
    dict[key] = targets
  }
  return dict
}

const mergeIndividualAttribute = (attrs: (CompAttritube | boolean | undefined)[]): CompAttritube | boolean => {
  let attr: CompAttritube | boolean = {}
  for (const _attr of attrs) {
    if (_attr === undefined) continue
    if (typeof _attr === 'boolean') {
      if (!_attr) attr = false
      break
    }
    attr.className = twMerge(attr.className, _attr?.className)
    if (_attr?.children) attr.children = _attr.children
  }
  return attr
}

const mergeAttributes = (attrs: ModalAttr[]): { [compName: string]: CompAttritube | boolean } => {
  const keys = MODAL_ATTR
  const modalAttrDict: { [key in ModalAttrKey]?: CompAttritube[] } = {}
  for (const key of Array.from(keys)) modalAttrDict[key] = Array.from(attrs, (attr: any) => attr[key])

  const merged: { [key in ModalAttrKey]?: CompAttritube | boolean } = {}
  for (const [compName, attrs] of Object.entries(modalAttrDict)) {
    const _attrs = [defaultAttribute[compName as ModalAttrKey], ...attrs]
    merged[compName as ModalAttrKey] = mergeIndividualAttribute(_attrs)
  }
  return merged
}

export const mergeModalAttributesWithDefault = <A>(...props: ModalInit<A>[]) => {
  const keys = new Set(Array.from(props, attr => Object.keys(attr)).flat())
  const dict = arrageComponents(props, keys)
  const res: any = {}
  for (const [actions, attrs] of Object.entries(dict)) {
    res[actions] = mergeAttributes(attrs as ModalAttr[])
  }
  return res
}

const InstancePrefix = 'CodeModal__Instance'
export const createInstanceContainer = (id?: string) => {
  if (id) {
    const container = document.getElementById(`${InstancePrefix}-${id}`)
    if (container) return null
  }

  const div = document.createElement('div')
  if (id) div.id = `${InstancePrefix}-${id}`
  div.className = style.in
  return div
}
