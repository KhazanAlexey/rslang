import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { wordsAPI } from '../services/WordsService'
import { userAPI } from '../services/UserService'
import { audioCallSlice } from './reducers/audioCallSlice'
import { authApi } from '../services/AuthService'
import { authSlice } from './reducers/authSlice'
import { userWordsAPI } from '../services/UsersWordsService'
import { userWordsSlice } from './reducers/userWordsSlice'
import { sprintSlice } from './reducers/sprintSlice'
import { gameSettingsSlice } from './reducers/gameSettingsSlice'

const rootReducer = combineReducers({
  gameSettings: gameSettingsSlice.reducer,
  audioCall: audioCallSlice.reducer,
  auth: authSlice.reducer,
  sprint: sprintSlice.reducer,
  userWords: userWordsSlice.reducer,
  [wordsAPI.reducerPath]: wordsAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userWordsAPI.reducerPath]: userWordsAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        wordsAPI.middleware,
        userAPI.middleware,
        authApi.middleware,
        userWordsAPI.middleware,
      ]),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
