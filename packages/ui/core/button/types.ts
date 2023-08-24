import type { ButtonHTMLAttributes } from 'react'

export type InitAttr = {
  className?: string
  ripple?: boolean | string
}

export type Variants<V> = {
  variants: {
    [K in keyof V]: InitAttr
  }
}

export type InitAttrOrVariants<V> = InitAttr | Variants<V>

export interface InstanceProps<V> extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  ripple?: boolean | string
  loading?: boolean
  variant?: keyof V
  onClick?: Function
}
