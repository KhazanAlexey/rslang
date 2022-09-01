import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IWord } from '../models/IWord'

interface IPageParams {
  group?: number | null
  page?: number
}

export const wordsAPI = createApi({
  reducerPath: 'wordsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rs-lang-193.herokuapp.com/' }),
  tagTypes: ['Words'],
  endpoints: (build) => ({
    fetchWords: build.query<IWord[], IPageParams>({
      query: ({ group, page }) => ({
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
