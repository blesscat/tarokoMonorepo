import { memo, CSSProperties } from 'react'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

const Error = memo((props: { className?: string; noShow?: boolean; style: CSSProperties; text?: JSX.Element | string }) => {
  const { className, noShow, text, style } = props

  if (noShow) return <></>
  return (
    <div className={twMerge('pointer-events-none', className)} style={style}>
      <motion.div layout>{text}</motion.div>
    </div>
  )
})

export default Error
