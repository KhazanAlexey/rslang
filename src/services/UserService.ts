import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IUser, IUserResp } from '../models/IUser'

interface IPageParams {
  group?: number
  page?: number
}

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:27017' }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    createUser: build.mutation<IUser, IUser>({
      query: ({ name, password, email }) => ({
        url: `/users`,
        method: 'POST',
        body: {
          name: name,
          password: password,
          email: email,
        },
      }),
      invalidatesTags: ['User'],
    }),
    fetchUser: build.query<IUser, string>({
      query: (id: string) => ({
        url: `/users/${id}`,
      }),
      providesTags: (result) => ['User'],
    }),
    updateUser: build.mutation<IUserResp, IUser>({
      query: ({ id, password, email }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: {
          password: password,
          email: email,
        },
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: build.mutation<any, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
})
