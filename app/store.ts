import { configureStore } from '@reduxjs/toolkit'
import bottlesReducer from '../features/bottles/slice'

export const store = configureStore({
  reducer: {
    bottles: bottlesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
