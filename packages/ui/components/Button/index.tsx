import { createButton } from '../../core/button'

const Button = createButton({
  variants: {
    primary: {
      className: 'rounded-md h-7 bg-[#4c9eea] text-white',
    },
    primaryXs: {
      className: 'rounded-md h-5 bg-[#4c9eea] text-white text-xs',
    },
    icon: {
      className: 'rounded-full flex items-center justify-center h-5 rounded-full px-1',
      ripple: '#4c9eea'
    }
  }
})

export default Button
