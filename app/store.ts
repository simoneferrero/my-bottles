import { configureStore } from '@reduxjs/toolkit'
import bottlesReducer from '../features/bottles/slice'
import { bottlesApi } from '../services/bottles'

export const store = configureStore({
  reducer: {
    bottles: bottlesReducer,
    [bottlesApi.reducerPath]: bottlesApi.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
