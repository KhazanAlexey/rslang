import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IAuth } from 'src/models/IAuth'
import { IUserResp } from '../models/IUser'

interface IPageParams {
  group?: number
  page?: number
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:27017',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      // const token = (getState() as RootState).auth.token
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', token)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<IAuth, IUserResp>({
      query: (credentials) => ({
        url: '/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
})
