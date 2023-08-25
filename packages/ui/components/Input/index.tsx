import createInput from '../../core/input'
import style from './input.module.scss'

export const classNames = {
  container: 'h-[40px] text-[14px] pr-[10px]'
}

export const initErrors = {
  format: (text: string) => <div className={style.format}>{text}</div>
}

export const colors = {
  main: '#4C9EEA',
  error: '#CB0202'
}

const Input = createInput({
  normal: {
    classNames,
    colors,
    initErrors
  },
  number: {
    classNames,
    colors,
    initErrors,
    inputAttr: {
      type: 'number',
      inputMode: 'decimal',
      pattern: '[0-9.]*'
    }
  },
  search: {
    classNames,
    colors,
    initErrors
  }
})

export default Input
