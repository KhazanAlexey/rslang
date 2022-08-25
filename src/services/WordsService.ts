import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IWord } from '../models/IWord'

interface IPageParams {
  group?: number
  page?: number
}

export const wordsAPI = createApi({
  reducerPath: 'wordsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:27017' }),
  tagTypes: ['Words'],
  endpoints: (build) => ({
    fetchWords: build.query<IWord[], IPageParams>({
      query: ({ group = 1, page = 1 }) => ({
        url: '/words',
        params: {
          group: group,
          page: page,
        },
      }),
      providesTags: (result) => ['Words'],
    }),
    fetchWordById: build.query<IWord, string>({
      query: (id: string) => ({
        url: `/words/${id}`,
      }),
    }),
  }),
})
