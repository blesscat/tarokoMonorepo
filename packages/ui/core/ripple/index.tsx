import { twMerge } from 'tailwind-merge'

import { RippleDivProps } from './types'
import createRippleAnimation from './createRippleAnimation'
import style from './ripple.module.scss'

const handleOnClick = (ripple?: string, callback?: Function) => (event: React.MouseEvent<HTMLDivElement>) => {
  createRippleAnimation(event, ripple)
  if (callback) callback(event)
}

export const createRipple = (init?: { ripple?: string }) => {
  const initRipple = init?.ripple

  return (props: RippleDivProps) => {
    const { onClick, ripple, disabled, className, ...rest } = props

    return (
      <div {...rest} className={twMerge(style.main, 'cursor-default sm:cursor-pointer', className)} onClick={disabled ? () => { } : handleOnClick(ripple || initRipple, onClick)} />
    )
  }
}
