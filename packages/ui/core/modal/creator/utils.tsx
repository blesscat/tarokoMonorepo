import type { CompAttritube, RenderChildren } from '../types'

export const genClassName = (init?: CompAttritube | boolean) => {
  let initClassName: string | undefined = ''
  let children: RenderChildren | false = false
  if (typeof init !== 'boolean' && init !== undefined) {
    initClassName = init.className
    children = init.children || children
  }

  return { initClassName, children }
}
