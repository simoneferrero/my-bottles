import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
  EntityState,
} from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import axios from 'axios'

import BOTTLE_CATEGORIES from '../../constants/bottleCategories'

import { Bottle, BottleFormState } from '../../types/Bottle'

const parseFormValues = (formValues: BottleFormState): Bottle => {
  const selectedCategory = BOTTLE_CATEGORIES.find(
    (bottleCategory) => bottleCategory === formValues.category
  )

  return {
    ...formValues,
    category: formValues.category.value,
    type: formValues?.type?.value,
    quantity: Number(formValues.quantity),
    year: selectedCategory.showYear ? formValues.year : undefined,
  }
}

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
    const parsedFormValues = parseFormValues(formValues)
    const { data } = await axios.post('/api/bottles', parsedFormValues)

    resetFormValues()

    return data
  }
)

export const updateBottle = createAsyncThunk(
  'bottles/update',
  async ({
    formValues,
    resetFormValues,
  }: {
    formValues: BottleFormState
    resetFormValues: () => unknown
  }) => {
    const parsedFormValues = parseFormValues(formValues)
    const { data } = await axios.put(
      `/api/bottles/${parsedFormValues._id}`,
      parsedFormValues
    )

    resetFormValues()

    return data
  }
)

export const bottlesAdapter = createEntityAdapter<Bottle>({
  selectId: (bottle) => bottle._id,
})

const initialState: EntityState<Bottle> & {
  bottleFormStatus: 'open' | 'closed'
  loading: boolean
  error?: string
  bottleId?: string
} = bottlesAdapter.getInitialState({
  bottleFormStatus: 'closed',
  loading: false,
  error: undefined,
  bottleId: 'Add New Bottle',
})

export const bottlesSlice = createSlice({
  name: 'bottles',
  initialState,
  reducers: {
    setBottleFormOpen: (
      state,
      { payload }: PayloadAction<string | undefined>
    ) => {
      state.bottleFormStatus = 'open'
      state.bottleId = payload
    },
    setBottleFormClosed: (state) => {
      state.bottleFormStatus = 'closed'
      state.bottleId = undefined
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
      state.bottleFormStatus = 'closed'
      state.bottleId = undefined
    })
    builder.addCase(addBottle.rejected, (state) => {
      state.error = 'There was an error adding your bottle.'
      state.loading = false
    })
    builder.addCase(updateBottle.pending, (state) => {
      state.error = undefined
      state.loading = true
    })
    builder.addCase(updateBottle.fulfilled, (state, action) => {
      bottlesAdapter.upsertOne(state, action.payload)
      state.loading = false
      state.bottleFormStatus = 'closed'
      state.bottleId = undefined
    })
    builder.addCase(updateBottle.rejected, (state) => {
      state.error = 'There was an error updating your bottle.'
      state.loading = false
    })
  },
})

export const { setBottleFormOpen, setBottleFormClosed } = bottlesSlice.actions

export const {
  selectById: selectBottleById,
  selectIds: selectBottleIds,
  selectEntities: selectBottleEntities,
  selectAll: selectAllBottles,
  selectTotal: selectTotalBottles,
} = bottlesAdapter.getSelectors((state: RootState) => state.bottles)
export const selectBottleFormStatus = (state: RootState): 'open' | 'closed' =>
  state.bottles.bottleFormStatus
export const selectLoading = (state: RootState): boolean =>
  state.bottles.loading
export const selectError = (state: RootState): string => state.bottles.error
export const selectBottleToUpdate = (state: RootState): Bottle =>
  selectBottleById(state, state.bottles.bottleId)

export default bottlesSlice.reducer
