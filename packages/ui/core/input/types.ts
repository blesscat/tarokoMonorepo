import React from 'react'
import type { InputHTMLAttributes } from 'react'

export const InputComponents = ['main', 'container', 'title', 'input', 'preprend', 'append', 'error'] as const

export type InputComponentKeys = typeof InputComponents[number]

export type InputInitAttr = {
  title?: string
  tween?: boolean
  prepend?: (props?: { additional?: any }) => JSX.Element
  append?: (props?: { additional?: any }) => JSX.Element
  initErrors?: {
    noBlock?: boolean
    absolute?: boolean
    format?: (text: string) => JSX.Element | string
  }
  inputAttr?: InputHTMLAttributes<HTMLInputElement>
  classNames?: {
    [key in InputComponentKeys]?: string
  }
  colors?: {
    main?: string
    error?: string
  }
}

export type Variants<V> = {
  [Key in keyof V]: InputInitAttr
} & { normal: InputInitAttr }

export interface InputInstanceProps<V> extends InputHTMLAttributes<HTMLInputElement> {
  forwardedRef?: (e: HTMLInputElement | null) => void
  variant?: keyof V
  prepend?: JSX.Element
  append?: JSX.Element
  title?: string
  error?: string
  tween?: boolean
  noErrorBlock?: boolean
  classNames?: {
    [key in InputComponentKeys]?: string
  }
}

export interface InputComponentProps<V> {
  classNames: Map<string, string>
  focus?: boolean
  tween?: boolean
  initInputAttr?: InputHTMLAttributes<HTMLInputElement>
  focusCB: () => void
  blurCB: () => void
  callingProps: InputInstanceProps<V>
  style: React.CSSProperties
  error?: string
}
