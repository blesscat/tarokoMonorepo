import { twMerge } from 'tailwind-merge'

import Loading from './Loading'
import type { InitAttr, Variants, InstanceProps } from './types'
import { createRipple, initAttrMerge, hasRipple } from './utils'
import style from './button.module.scss'

const handleClick = (loading?: boolean, ripple?: boolean | string, callback?: Function) => (event: React.MouseEvent<HTMLButtonElement>) => {
  if (loading) return
  if (ripple) createRipple(event, ripple)
  if (callback) callback(event)
}

const removeActiveClasses = (className: string) => className.replace(/ active:\S* ?/, ' ')

const createInstance =
  <V,>(def: Variants<V>) =>
    (props: InstanceProps<typeof def.variants>) => {
      const { variant = 'primary', loading, ripple, type = 'button', ...restProps } = props

      const _ripple = hasRipple(ripple) ? ripple : def.variants[variant as keyof V].ripple

      let _className = twMerge(def.variants[variant as keyof V].className, props.className)
      if (props.loading) _className = removeActiveClasses(_className)

      return (
        <button {...restProps} type={type} className={twMerge(_className, style.main, 'cursor-default sm:cursor-pointer')} onClick={handleClick(loading, _ripple, props.onClick)}>
          <span className={props.loading ? 'invisible' : ''}>{props.children}</span>
          {props.loading && <Loading />}
        </button>
      )
    }

const defaultAttr: InitAttr = {
  className: 'h-[40px] inline-flex items-center justify-center px-[15px]',
  ripple: true
}

const mergeVariants = <V,>(init: Variants<V>): Variants<V> => {
  let _def: any = { variants: {} }
  for (const [variant, variantAttr] of Object.entries(init.variants)) {
    _def.variants[variant] = initAttrMerge(defaultAttr, variantAttr as InitAttr)
  }
  return _def
}

export const createButton = <V,>(init?: Variants<V>) => {
  let def: any = {
    variants: {
      primary: {}
    }
  }
  if (init) def = mergeVariants(init)

  return createInstance(def as Variants<V>)
}

export * as ButtonTypes from './types'
