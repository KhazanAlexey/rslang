import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { wordsAPI } from '../services/WordsService'
import { userAPI } from '../services/UserService'
import authReducer from './reducers/auth/AuthSlice'
import { authApi } from '../services/AuthService'

const rootReducer = combineReducers({
  auth: authReducer,
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
