import { type ReactElement } from 'react'

interface LoadingProps {
  isLoading: boolean
  children: React.ReactNode
}

const Loading = (props: LoadingProps): ReactElement => {
  const { isLoading, children } = props
  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }
  return (
    <div>
      {children}
    </div>
  )
}

export default Loading
