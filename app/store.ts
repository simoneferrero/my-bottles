import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import bottlesReducer from '../features/bottles/slice'
import { bottlesApi } from '../services/bottles'

export const store = configureStore({
  reducer: {
    bottles: bottlesReducer,
    [bottlesApi.reducerPath]: bottlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bottlesApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
