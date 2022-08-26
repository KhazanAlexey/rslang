import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'src/store/store'
import { IWord } from '../../../models/IWord'
import { wordsAPI } from '../../../services/WordsService'
import { authApi } from '../../../services/AuthService'

interface UserState {
  words: IWord[]
  isLoading: boolean
  error: string
}

const initialState: AuthState = {
  message: '',
  token: '',
  refreshToken: '',
  userId: '',
  name: '',
}

type AuthState = {
  message: string
  token: string
  refreshToken: string
  userId: string
  name: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {

      state.token = payload.token
      state.userId = payload.userId
      state.message = payload.message
      state.refreshToken = payload.refreshToken
      state.name = payload.name
    })
  },
})

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.name
