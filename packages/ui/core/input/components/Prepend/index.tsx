import { memo } from 'react'

const Prepend = memo((props: { init?: () => JSX.Element; calling?: JSX.Element }) => {
  if (props.calling) return props.calling
  if (props.init) return <props.init />
  return <> </>
})

export default Prepend
