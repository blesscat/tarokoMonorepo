import type { ModalInit, ModalAttr } from './types'

export const defaultAttribute: ModalAttr = {
  container: {
    className: 'relative w-[300px] bg-white rounded-[10px]'
  },
  header: {
    className: 'px-[10px] rounded-tl-[10px] rounded-tr-[10px]'
  },
  content: {
    className: 'px-[10px]'
  },
  footer: {
    className: 'p-[10px]'
  }
}

export const initArrtibute: ModalInit<{}> = {
  alert: {
    header: {
      className: 'text-center'
    },
    content: {
      className: 'text-center'
    },
    footer: {
      className: ''
    }
  }
}
