import { nestedToJsCase, nestedToRbCase } from '@/utils/caseConverters'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'

const autoCaseConvertQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
  {
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
  },
  unknown,
  unknown
  > =>
    async ({ url, method, data, params }) => {
      try {
        const result = await axios({
          url: baseUrl + url,
          method,
          data: nestedToRbCase(data),
          params: nestedToRbCase(params),
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name=csrf-token]')?.getAttribute('content'),
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
        return { data: nestedToJsCase(result.data) }
      } catch (axiosError) {
        const err = axiosError as AxiosError
        return {
          error: {
            status: err.response?.status,
            data: nestedToJsCase(err.response?.data || err.message)
          }
        }
      }
    }

export default autoCaseConvertQuery
