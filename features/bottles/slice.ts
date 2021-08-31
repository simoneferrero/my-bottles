import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import axios from 'axios'

import { Bottle } from '../../types/Bottle'

export const getBottles = createAsyncThunk('bottles/getAll', async () => {
  const { data } = await axios.get('/api/bottles')
  return data
})

export const bottlesAdapter = createEntityAdapter<Bottle>({
  selectId: (bottle) => bottle._id,
})

const initialState = bottlesAdapter.getInitialState({
  showAddBottle: false,
  loading: false,
  error: undefined,
})

export const bottlesSlice = createSlice({
  name: 'bottles',
  initialState,
  reducers: {
    setShowAddBottle: (state, { payload }: PayloadAction<boolean>) => {
      state.showAddBottle = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBottles.pending, (state) => {
      state.error = undefined
      state.loading = true
    })
    builder.addCase(getBottles.fulfilled, (state, action) => {
      bottlesAdapter.upsertMany(state, action.payload)
      state.loading = false
    })
    builder.addCase(getBottles.rejected, (state) => {
      state.error = 'There was an error loading your bottles.'
      state.loading = false
    })
  },
})

export const { setShowAddBottle } = bottlesSlice.actions

export const {
  selectById: selectBottleById,
  selectIds: selectBottleIds,
  selectEntities: selectBottleEntities,
  selectAll: selectAllBottles,
  selectTotal: selectTotalBottles,
} = bottlesAdapter.getSelectors((state: RootState) => state.bottles)
export const selectShowAddBottle = (state: RootState): boolean =>
  state.bottles.showAddBottle
export const selectLoading = (state: RootState): boolean =>
  state.bottles.loading
export const selectError = (state: RootState): boolean => state.bottles.error

export default bottlesSlice.reducer
