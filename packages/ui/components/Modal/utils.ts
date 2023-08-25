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
