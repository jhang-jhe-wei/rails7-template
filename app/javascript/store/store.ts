import { type AnyAction, type Store, type ThunkDispatch, configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// 透過 const export 的 action 與 reducer 都放在這裡
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { reset } from './action'
import { testApi } from './store'

const store = configureStore({
  reducer: {
    [testApi.reducerPath]: testApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(testApi.middleware)
  }
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<AppDispatch, any, AnyAction>
export type AppStore = Omit<Store<AppDispatch, AnyAction>, 'dispatch'> & { dispatch: AppThunkDispatch }
export const useAppDispatch = (): AppDispatch => useDispatch()
export type AppState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

// 放入所有跟 user 相關的 api
export * from './api/testApi'
// 所有 actions 從 store.ts 中 export 這樣其他component使用的時候可以直接 import store 而非其他slice
export { store, reset }
