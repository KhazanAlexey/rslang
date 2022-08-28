import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IAuth } from 'src/models/IAuth'
import { IUserResp } from '../models/IUser'

interface IPageParams {
  group?: number
  page?: number
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:27017',
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
