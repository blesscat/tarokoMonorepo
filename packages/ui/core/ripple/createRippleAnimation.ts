import style from './ripple.module.scss'

export const createRipple = (event: any, ripple?: string) => {
  const el = event.currentTarget

  const circle = document.createElement('span')
  const diameter = Math.max(el.clientWidth, el.clientHeight)
  const radius = diameter / 2
  const clientRect = el.getBoundingClientRect()

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - clientRect.left - radius}px`
  circle.style.top = `${event.clientY - clientRect.top - radius}px`
  circle.classList.add(style.ripple)

  if (ripple) circle.style.backgroundColor = ripple
  else circle.style.backgroundColor = '#333333'

  const rippleDOM = el.getElementsByClassName(style.ripple)[0]

  if (rippleDOM) rippleDOM.remove()

  el.appendChild(circle)

  setTimeout(() => {
    const rippleDOM = el.getElementsByClassName(style.ripple)[0]
    if (rippleDOM) rippleDOM.remove()
  }, 600)
}

export default createRipple
