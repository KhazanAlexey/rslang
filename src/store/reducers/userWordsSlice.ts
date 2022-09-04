import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../../services/AuthService'
import { localStorageSet } from '../../utils/localStoradre'
import { userAPI } from '../../services/UserService'
import { userWordsAPI } from '../../services/UsersWordsService'
import { IUsersWords } from '../../models/IUsersWords'
import { IWord } from '../../models/IWord'
import { wordsAPI } from '../../services/WordsService'

const initialState: userWords = {
  hardWords: [],
  words: [],
  hardWordsIds: [],
}

type userWords = {
  words: IWord[]
  hardWords: IUsersWords[]
  hardWordsIds: string[]
}

// @ts-ignore
export const deleteHardWord: CaseReducer<userWords> = (state, action: PayloadAction<string>) => {
  state.hardWords = state.hardWords.filter((word) => word.wordId !== action.payload)
  state.hardWordsIds = state.hardWordsIds.filter((word) => word !== action.payload)
}

export const userWordsSlice = createSlice({
  name: 'userWords',
  initialState: initialState,
  reducers: {
    deleteHardWord,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userWordsAPI.endpoints.fetchUserWords.matchFulfilled,
      (state, { payload }) => {
        const hardW = payload.filter((word) => word.difficulty == 'hard')
        const hardWId = hardW.map((word) => word.wordId)
        state.hardWords = hardW
        state.hardWordsIds = hardWId
      },
    ),
      builder.addMatcher(wordsAPI.endpoints.fetchWords.matchFulfilled, (state, { payload }) => {
        state.words = payload
      })
  },
})
