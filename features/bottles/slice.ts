import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface Bottles {
  isAddBottleOpen: boolean
}

const initialState: Bottles = {
  isAddBottleOpen: false,
}

export const bottlesSlice = createSlice({
  name: 'bottles',
  initialState,
  reducers: {
    toggleIsAddBottleOpen: (state) => {
      state.isAddBottleOpen = !state.isAddBottleOpen
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

export const { toggleIsAddBottleOpen } = bottlesSlice.actions

export const selectIsAddBottleOpen = (state: RootState): boolean =>
  state.bottles.isAddBottleOpen

export default bottlesSlice.reducer
