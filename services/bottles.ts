import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bottlesApi = createApi({
  reducerPath: 'bottlesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getBottles: builder.query({
      query: () => 'bottles',
    }),
  }),
})

export const { useGetBottlesQuery } = bottlesApi
