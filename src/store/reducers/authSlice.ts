import { CaseReducer, createSlice } from '@reduxjs/toolkit'
import { IWord } from '../../models/IWord'
import { authApi } from '../../services/AuthService'
import { localStorageSet } from '../../utils/localStoradre'
import { userAPI } from '../../services/UserService'

interface UserState {
  words: IWord[]
  isLoading: boolean
  error: string
}

const initialState: AuthState = {
  isAuth: false,
  message: '',
  name: '',
  email: '',
}

type AuthState = {
  isAuth: boolean
  message: string
  name: string
  email: string
}

export const logOut: CaseReducer<AuthState> = (state, action) => {
  return initialState
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logOut,
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      localStorageSet(['refreshToken', 'userId', 'token'], payload)
      state.isAuth = true
      state.name = payload.name
      state.message = payload.message
    })

    builder.addMatcher(userAPI.endpoints.fetchUser.matchFulfilled, (state, { payload }) => {
      state.email = payload.email
      state.isAuth = true
      state.name = payload.name || ''
    })

    builder.addMatcher(userAPI.endpoints.fetchUser.matchRejected, (state, { payload }) => {
      return initialState
    })
  },
})
