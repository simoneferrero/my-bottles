import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
  EntityState,
} from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import axios from 'axios'
import AWS from 'aws-sdk'

import { parseFormValues } from '../../helpers/bottle'

import { Bottle, BottleFormState } from '../../types/Bottle'

const AWS_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
const AWS_REGION = process.env.NEXT_PUBLIC_AWS_REGION
const AWS_BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET
const AWS_S3_DOMAIN = process.env.NEXT_PUBLIC_AWS_S3_DOMAIN

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

const myBottlesBucket = new AWS.S3({
  params: { Bucket: AWS_BUCKET },
  region: AWS_REGION,
})

const getS3PutObjectParams = (image, name) => ({
  ACL: 'public-read',
  Body: image,
  Bucket: AWS_BUCKET,
  Key: name,
})

const uploadImage = async (image) => {
  if (!image) return

  const imageName = `${Date.now()}_${image.name.replaceAll(' ', '_')}`
  const uploadedFile = await myBottlesBucket
    .putObject(getS3PutObjectParams(image, imageName))
    .promise()

  if (uploadedFile.$response.httpResponse.statusCode !== 200) {
    throw new Error('There was an error uploading your image')
  }

  return AWS_S3_DOMAIN + imageName
}

export const getBottles = createAsyncThunk('bottles/getAll', async () => {
  const { data } = await axios.get('/api/bottles')
  return data
})

export const addBottle = createAsyncThunk(
  'bottles/add',
  async ({ formValues }: { formValues: BottleFormState }) => {
    const imageUrl = await uploadImage(formValues?.images?.[0])

    const parsedFormValues = parseFormValues(formValues, imageUrl)
    const { data } = await axios.post('/api/bottles', parsedFormValues)

    return data
  }
)

export const updateBottle = createAsyncThunk(
  'bottles/update',
  async ({ formValues }: { formValues: BottleFormState }) => {
    const imageUrl = await uploadImage(formValues?.images?.[0])

    const parsedFormValues = parseFormValues(formValues, imageUrl)
    const { data } = await axios.put(
      `/api/bottles/${formValues._id}`,
      parsedFormValues
    )

    return data
  }
)

export const bottlesAdapter = createEntityAdapter<Bottle>({
  selectId: (bottle) => bottle._id.toString(),
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
  bottleId: undefined,
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
