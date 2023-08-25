import { useState, useMemo, forwardRef } from 'react'
import type { ForwardedRef } from 'react'
import { twMerge } from 'tailwind-merge'

import Input from './components/Input'
import Append from './components/Append'
import Prepend from './components/Prepend'
import Error from './components/Error'

import defaultClassNames from './defaultClassNames'
import { InputComponents } from './types'
import type { InputInitAttr, InputInstanceProps, Variants } from './types'

const createInputInstance = (initProps: InputInitAttr) => {
  const { inputAttr, initErrors } = initProps
  const initClassNames = new Map()
  for (const component of InputComponents) {
    initClassNames.set(component, twMerge(defaultClassNames[component], initProps?.classNames && initProps?.classNames[component]))
  }

  return <V,>(callingProps: InputInstanceProps<V>) => {
    const { className, classNames, error, noErrorBlock } = callingProps
    const [focus, setFocus] = useState<boolean>(false)

    const _error = useMemo(() => {
      if (initErrors?.format && error) return initErrors.format(error)
      else return ''
    }, [error])

    return (
      <div className={twMerge(initClassNames.get('main'), className, classNames?.main, 'relative')}>
        <div
          className={twMerge('flex transition', initClassNames.get('container'), classNames?.container)}
          style={{
            ...(focus && { borderColor: initProps?.colors?.main || '#4C9EEA' }),
            ...(error && { borderColor: initProps?.colors?.error || '#CB0202' }),
            ...(focus && { whiteSpace: 'nowrap' })
          }}
        >
          <Prepend init={initProps.prepend} calling={callingProps.prepend} />
          <Input
            focus={focus}
            error={error}
            classNames={initClassNames}
            callingProps={callingProps}
            initInputAttr={inputAttr}
            focusCB={() => setFocus(true)}
            blurCB={() => setFocus(false)}
            tween={initProps.tween || callingProps.tween}
            style={{
              ...(error && { color: initProps?.colors?.error || '#CB0202' })
            }}
          />
          <Append init={initProps.append} calling={callingProps.append} />
        </div>
        <Error
          className={twMerge('relative', initClassNames.get('error'), classNames?.error, initErrors?.absolute ? 'absolute w-full' : '')}
          style={{
            ...(error && { color: initProps?.colors?.error || '#CB0202' })
          }}
          noShow={noErrorBlock || initErrors?.noBlock}
          text={_error}
        />
      </div>
    )
  }
}

const createInput = <V,>(init?: Variants<V>) => {
  const map = new Map()

  if (!init) return () => <div> working in progress </div>
  for (const [variant, props] of Object.entries(init)) {
    const instance = createInputInstance(props as InputInitAttr)
    map.set(variant, instance)
  }

  return forwardRef((props: InputInstanceProps<V>, ref: ForwardedRef<HTMLInputElement>) => {
    const { variant = 'normal', ...rest } = props
    const Component = map.get(variant)

    return <Component {...rest} forwardedRef={ref} />
  })
}

export default createInput
