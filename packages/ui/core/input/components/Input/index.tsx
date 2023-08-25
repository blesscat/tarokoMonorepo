import { useRef, useState, useEffect, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

import type { InputComponentProps } from '../../types'

const Title = (props: { title?: string; element: HTMLInputElement | null; className?: string; active?: boolean }) => {
  const { element, className, title, active } = props

  return (
    <div
      className={twMerge('pointer-events-none absolute transition ease-out', className)}
      style={{
        ...(active && element && { transform: `translate(-14.7%, -18.5px) scale(0.7)` })
      }}
    >
      {title}
    </div>
  )
}

interface UseTweenValueProps {
  focus?: boolean
  input: HTMLInputElement | null
  fake: HTMLDivElement | null
  tween?: boolean
}

const duration = 500
const useTweenValue = (props: UseTweenValueProps) => {
  const { input, fake, tween, focus } = props
  const rafIdRef = useRef<number>()
  const initValueRef = useRef<number>(0)
  const [done, setDone] = useState<boolean>(true)

  useEffect(() => {
    if (!input) return
    if (done) initValueRef.current = isNaN(Number(input.value)) ? 0 : Number(input.value)
  }, [done, input])

  useEffect(() => {
    if (!input) return
    if (!focus) initValueRef.current = isNaN(Number(input.value)) ? 0 : Number(input.value)
  }, [focus])

  useEffect(() => {
    if (focus) return
    if (!tween) return
    if (!initValueRef) return
    if (!input || !fake) return
    if (isNaN(Number(input.value))) return

    if (rafIdRef.current) window.cancelAnimationFrame(rafIdRef.current)

    let startTimestamp: number
    let tweenValue: number

    const counting = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp

      const inProcessDuration = timestamp - startTimestamp

      const percentage = inProcessDuration / duration
      if (percentage < 1) {
        const diff = Number(input.value) - initValueRef.current
        tweenValue = Math.round(diff * percentage) + initValueRef.current
        if (tweenValue !== 0) fake.innerHTML = `${tweenValue}`
        rafIdRef.current = window.requestAnimationFrame(counting)
      } else {
        initValueRef.current = 0
        setDone(true)
      }
    }

    rafIdRef.current = window.requestAnimationFrame(counting)
    // input.value = ''
    setDone(false)

    return () => {
      if (rafIdRef.current) window.cancelAnimationFrame(rafIdRef.current)
    }
  }, [input?.value])

  return done
}

const InputComponent = <V,>(props: InputComponentProps<V>) => {
  const { classNames, callingProps, initInputAttr, blurCB, focusCB, tween, focus, style } = props
  const {
    className,
    classNames: callingClassNames,
    title,
    onFocus,
    onBlur,
    onChange,
    noErrorBlock,
    forwardedRef,
    value,
    ...callingInputAttributes
  } = callingProps

  const inputRef = useRef<HTMLInputElement | null>(null)
  const fakeRef = useRef<HTMLDivElement | null>(null)
  const [hasValue, setHasValue] = useState<boolean>(false)
  const done = useTweenValue({ tween, input: inputRef.current, fake: fakeRef.current, focus })

  const handleInputOnFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>) => {
      if (callingProps.readOnly) return
      setHasValue(true)
      focusCB()
      if (onFocus) onFocus(e)
    },
    [inputRef.current]
  )

  const handleInputOnBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>) => {
      blurCB()
      if (!inputRef?.current?.value) setHasValue(false)
      if (onBlur) onBlur(e)
    },
    [inputRef.current]
  )

  const handleInputOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!done) return
      if (onChange) onChange(e)
    },
    [inputRef.current]
  )

  useEffect(() => {
    if (focus) return
    if (inputRef?.current?.value) setHasValue(true)
    else setHasValue(false)
  }, [focus, inputRef?.current?.value])

  useEffect(() => {
    if (!inputRef?.current) return
    if (value) {
      inputRef.current.value = String(value)
      setHasValue(true)
    } else {
      inputRef.current.value = ''
      setHasValue(false)
    }
  }, [value])

  return (
    <div className='flex items-center flex-1' onClick={() => inputRef?.current?.focus()}>
      <Title title={title} className={classNames.get('title')} element={inputRef?.current} active={hasValue} />
      <input
        {...initInputAttr}
        {...callingInputAttributes}
        className={twMerge('w-full outline-none', classNames.get('input'), callingClassNames?.input)}
        onFocus={e => handleInputOnFocus(e)}
        onBlur={e => handleInputOnBlur(e)}
        onChange={e => handleInputOnChange(e)}
        style={{
          ...style,
          ...(!focus && { visibility: done ? 'initial' : 'hidden' })
        }}
        ref={e => {
          if (forwardedRef) forwardedRef(e)
          inputRef.current = e
        }}
      />
      <div
        className={twMerge('absolute', classNames.get('input'), callingClassNames?.input)}
        style={{
          ...(focus ? { visibility: 'hidden' } : { visibility: done ? 'hidden' : 'initial' })
        }}
        ref={fakeRef}
      />
    </div>
  )
}

export default InputComponent
