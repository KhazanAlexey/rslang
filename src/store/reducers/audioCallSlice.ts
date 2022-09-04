import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWord } from '../../models/IWord'
import { GameState, Levels } from '../../models/IAudioCall'

const initialState: AudioCallState = {
  level: 0,
  activeScreen: GameState.StartScreen,
  correctAnswers: [],
  wrongAnswers: [],
}

type AudioCallState = {
  level: Levels
  activeScreen: GameState
  correctAnswers: IWord[]
  wrongAnswers: IWord[]
}

const setLevel: CaseReducer<AudioCallState, PayloadAction<number>> = (state, action) => {
  state.level = action.payload
}

const setActiveScreen: CaseReducer<AudioCallState, PayloadAction<GameState>> = (state, action) => {
  state.activeScreen = action.payload
}

const setCorrectAnswers: CaseReducer<AudioCallState, PayloadAction<IWord>> = (state, action) => {
  state.correctAnswers.push(action.payload)
}

const setWrongAnswers: CaseReducer<AudioCallState, PayloadAction<IWord>> = (state, action) => {
  state.wrongAnswers.push(action.payload)
}

export const audioCallSlice = createSlice({
  name: 'audioCall',
  initialState: initialState,
  reducers: {
    setLevel,
    setActiveScreen,
    setCorrectAnswers,
    setWrongAnswers,
  },
})
