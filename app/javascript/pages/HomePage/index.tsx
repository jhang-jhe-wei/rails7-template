import { type ReactElement } from 'react'
import { useFetchTestesQuery } from '@/store/store'
import Loading from '@/components/Loading'

const HomePage = (): ReactElement => {
  const { data, isLoading } = useFetchTestesQuery()
  return (
    <Loading isLoading={isLoading}>
      <p>HomePage</p>
      <p>message: { data?.message }</p>
    </Loading>
  )
}

export default HomePage
