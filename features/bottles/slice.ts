import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import axios from 'axios'

import BOTTLE_CATEGORIES from '../../constants/bottleCategories'

import { Bottle, BottleFormState } from '../../types/Bottle'

export const getBottles = createAsyncThunk('bottles/getAll', async () => {
  const { data } = await axios.get('/api/bottles')
  return data
})

export const addBottle = createAsyncThunk(
  'bottles/add',
  async ({
    formValues,
    resetFormValues,
  }: {
    formValues: BottleFormState
    resetFormValues: () => unknown
  }) => {
    const selectedCategory = BOTTLE_CATEGORIES.find(
      (bottleCategory) => bottleCategory === formValues.category
    )
    const parsedFormValues = {
      ...formValues,
      category: formValues.category.value,
      type: formValues?.type?.value,
      quantity: Number(formValues.quantity),
      year: selectedCategory.showYear ? formValues.year : undefined,
    }
    const { data } = await axios.post('/api/bottles', parsedFormValues)

    resetFormValues()

    return data
  }
)

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
    builder.addCase(addBottle.pending, (state) => {
      state.error = undefined
      state.loading = true
    })
    builder.addCase(addBottle.fulfilled, (state, action) => {
      bottlesAdapter.addOne(state, action.payload)
      state.loading = false
      state.showAddBottle = false
    })
    builder.addCase(addBottle.rejected, (state) => {
      state.error = 'There was an error adding your bottle.'
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
