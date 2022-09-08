import { CaseReducer, createSlice } from '@reduxjs/toolkit'
import { authApi } from 'src/services/AuthService'
import { IWord } from '../../models/IWord'
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

export const logOut: CaseReducer<AuthState> = () => {
  return initialState
}

export const logIn: CaseReducer<AuthState> = (state, {payload}) => {
  state.name = payload.name
  state.isAuth = true
  state.email = payload.email
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logOut,
    logIn,
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
