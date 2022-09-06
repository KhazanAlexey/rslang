import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userWordsAPI } from '../../services/UsersWordsService'
import { IUsersWords } from '../../models/IUsersWords'
import { IWord } from '../../models/IWord'
import { wordsAPI } from '../../services/WordsService'

const initialState: userWords = {
  hardWords: [],
  userWords: [],
  hardWordsIds: [],
  userWordsIds:[],
  completedWords: [],
  completedWordsIds: [],
}

type userWords = {
  userWords: IUsersWords[]
  hardWords: IUsersWords[]
  hardWordsIds: string[]
  userWordsIds: string[]
  completedWords: IUsersWords[]
  completedWordsIds: string[]
}

// @ts-ignore
export const deleteHardWord: CaseReducer<userWords> = (state, action: PayloadAction<string>) => {
  state.hardWords = state.hardWords.filter((word) => word.wordId !== action.payload)
  state.hardWordsIds = state.hardWordsIds.filter((word) => word !== action.payload)
}
// @ts-ignore
export const deleteCompletedWord: CaseReducer<userWords> = (
  state,
  action: PayloadAction<string>,
) => {
  state.completedWords = state.completedWords.filter((word) => word.wordId !== action.payload)
  state.completedWordsIds = state.completedWordsIds.filter((word) => word !== action.payload)
}

export const userWordsSlice = createSlice({
  name: 'userWords',
  initialState: initialState,
  reducers: {
    deleteHardWord,
    deleteCompletedWord,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userWordsAPI.endpoints.fetchUserWords.matchFulfilled,
      (state, { payload }) => {
        const hardW = payload.filter((word) => word.difficulty == 'hard')
        const hardWId = hardW.map((word) => word.wordId)
        const completedW = payload.filter((word) => word.difficulty == 'completed')
        const completeWId = completedW.map((word) => word.wordId)
        state.hardWords = hardW
        state.hardWordsIds = hardWId
        state.completedWords = completedW
        state.completedWordsIds = completeWId
        state.userWords=payload
        state.userWordsIds=payload.map(word=>word.wordId)
      },
    )
      // builder.addMatcher(wordsAPI.endpoints.fetchWords.matchFulfilled, (state, { payload }) => {
      //   state.words = payload
      // })
  },
})
