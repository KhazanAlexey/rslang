import { BaseQueryMeta, BaseQueryResult } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IAggreratedWords, IDeleteUsersWord, IPostUsersWord, IUsersWords } from 'src/models/IUsersWords'
import { IWord } from 'src/models/IWord'

export const userWordsAPI = createApi({
  reducerPath: 'userWordsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rs-lang-193.herokuapp.com/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),

  tagTypes: ['userWords', 'userWord', 'AggregatedWords', 'FetchUserWordByID'],
  endpoints: (build) => ({
    fetchUserWords: build.query<IUsersWords[], string>({
      query: (id) => ({
        url: `/users/${id}/words`,
      }),
      providesTags: () => ['userWords'],
    }),

    fetchUserWord: build.query<IUsersWords, IPostUsersWord>({
      query: ({ id, wordId }) => ({
        url: `/users/${id}/words/${wordId}`,
      }),
      providesTags: () => ['userWord'],
    }),

    postUserWord: build.mutation<IUsersWords[], IPostUsersWord>({
      query: ({ id, wordId, difficulty, optional }) => ({
        method: 'POST',
        url: `/users/${id}/words/${wordId}`,
        body: {
          difficulty: difficulty,
          optional: optional,
        },
      }),
      invalidatesTags: ['userWord', 'userWords', 'AggregatedWords'],
    }),

    updateUserWord: build.mutation<IUsersWords[], IPostUsersWord>({
      query: ({ id, wordId, difficulty, optional }) => ({
        method: 'PUT',
        url: `/users/${id}/words/${wordId}`,
        body: {
          difficulty: difficulty,
          optional: optional,
        },
      }),
      invalidatesTags: ['userWord', 'userWords', 'AggregatedWords'],
    }),

    deleteUserWord: build.mutation<IUsersWords[], IDeleteUsersWord>({
      query: ({ id, wordId }) => ({
        method: 'DELETE',
        url: `/users/${id}/words/${wordId}`,
      }),
      invalidatesTags: ['userWord', 'AggregatedWords', 'AggregatedWords'],
    }),

    fetchAggregatedWords: build.query<IAggreratedWords, {id: string; wordsDifficult: string}>({
      query: ({ id, wordsDifficult }) => ({
        url: `/users/${id}/aggregatedWords`,
        params: {
          wordsPerPage: 3600,
          filter: JSON.stringify({ 'userWord.difficulty': wordsDifficult }),
        },
      }),
      providesTags: () => ['AggregatedWords'],
    }),
  }),
})
