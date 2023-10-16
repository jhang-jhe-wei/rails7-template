import { createApi } from '@reduxjs/toolkit/query/react'
import autoCaseConvertQuery from './autoCaseConvertQuery'

interface FetchTestesResponseType {
  message: string
}

const testApi = createApi({
  reducerPath: 'test',
  baseQuery: autoCaseConvertQuery(),
  endpoints: (builder) => ({
    fetchTestes: builder.query<FetchTestesResponseType, void>({
      query: () => ({
        url: '/api/testes.json',
        method: 'GET'
      })
    })
  })
})

export const testReducer = testApi.reducer
export const { useFetchTestesQuery } = testApi
export { testApi }
