import style from './button.module.scss'
import { twMerge } from 'tailwind-merge'
import type { InitAttr } from './types'

export const createRipple = (event: any, ripple: boolean | string) => {
  const button = event.currentTarget

  const circle = document.createElement('span')
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2
  const clientRect = button.getBoundingClientRect()

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - clientRect.left - radius}px`
  circle.style.top = `${event.clientY - clientRect.top - radius}px`
  circle.classList.add(style.ripple)

  if (typeof ripple === 'string') circle.style.backgroundColor = ripple
  else circle.style.backgroundColor = '#ffffff'

  const rippleDOM = button.getElementsByClassName(style.ripple)[0]

  if (rippleDOM) rippleDOM.remove()

  button.appendChild(circle)

  setTimeout(() => {
    const rippleDOM = button.getElementsByClassName(style.ripple)[0]
    if (rippleDOM) rippleDOM.remove()
  }, 600)
}

export const hasRipple = (ripple?: boolean | string) => typeof ripple === 'boolean' || typeof ripple === 'string'

export const initAttrMerge = (...props: InitAttr[]): InitAttr => {
  const merged: InitAttr = {}

  for (const prop of props) {
    merged.className = twMerge(merged.className, prop.className)
    merged.ripple = hasRipple(prop.ripple) ? prop.ripple : merged.ripple
  }

  return merged
}
