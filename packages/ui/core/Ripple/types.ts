import type { HTMLAttributes } from 'react'

export interface RippleDivProps extends HTMLAttributes<HTMLDivElement> {
  ripple?: string
  disabled?: boolean
}
