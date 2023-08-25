import { memo } from 'react'

const Append = memo((props: { init?: () => JSX.Element; calling?: JSX.Element; additional?: any }) => {
  if (props.calling) return props.calling
  if (props.init) return <props.init />
  return <> </>
})

export default Append
