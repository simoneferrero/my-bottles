import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface Bottles {
  showAddBottle: boolean
}

const initialState: Bottles = {
  showAddBottle: false,
}

export const bottlesSlice = createSlice({
  name: 'bottles',
  initialState,
  reducers: {
    setShowAddBottle: (state, { payload }: PayloadAction<boolean>) => {
      state.showAddBottle = payload
    },
  },
})

export const { setShowAddBottle } = bottlesSlice.actions

export const selectShowAddBottle = (state: RootState): boolean =>
  state.bottles.showAddBottle

export default bottlesSlice.reducer
