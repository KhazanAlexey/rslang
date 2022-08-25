import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { wordsAPI } from '../services/WordsService'
import { userAPI } from '../services/UserService'

const rootReducer = combineReducers({
  // userReducer,
  [wordsAPI.reducerPath]: wordsAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([wordsAPI.middleware, userAPI.middleware]),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
