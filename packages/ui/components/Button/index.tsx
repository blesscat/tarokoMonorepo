import { createButton } from '../../core/button'

const Button = createButton({
  variants: {
    primary: {
      className: 'rounded-md h-7 bg-[#4c9eea] text-white',
    },
    primaryXs: {
      className: 'rounded-md h-5 bg-[#4c9eea] text-white text-xs',
    }
  }
})

export default Button
