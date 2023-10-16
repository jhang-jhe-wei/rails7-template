import { createAction } from '@reduxjs/toolkit'

// 多個 reducer 會共用的 action 可以放在這裡
export const reset = createAction('app/reset')
