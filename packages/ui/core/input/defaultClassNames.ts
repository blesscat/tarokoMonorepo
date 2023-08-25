import { InputComponentKeys } from './types'

const defaultClassNames: { [key in InputComponentKeys]?: string } = {
  container: 'bg-white border border-[#EEEEEE] rounded-[12px] px-[15px]',
  title: 'text-[#BBBBBB]',
  input: 'text-[#333333] disabled:bg-white',
  error: 'h-auto text-xs leading-[18px]'
}

export default defaultClassNames
