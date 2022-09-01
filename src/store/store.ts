import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { wordsAPI } from '../services/WordsService'
import { userAPI } from '../services/UserService'
import { audioCallSlice } from './reducers/audioCall/audioCallSlice'
import { authApi } from '../services/AuthService'
import { authSlice } from './reducers/auth/authSlice'

const rootReducer = combineReducers({
  audioCall: audioCallSlice.reducer,
  auth: authSlice.reducer,
  [wordsAPI.reducerPath]: wordsAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [authApi.reducerPath]: authApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([wordsAPI.middleware, userAPI.middleware, authApi.middleware]),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
