import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGameSettings } from 'src/models/IGamesSettings';

const initialState: IGameSettings = {
  isFromBook: false,
  lvlFromBook: 0,
  pageFromBook: 0
}

export const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    toggleIsFromBook: (state, action: {payload: boolean, type: string}) => {
      state.isFromBook = action.payload;
    },
    setLvlBook: (state, action: {payload: number, type: string}) => {
      state.lvlFromBook = action.payload;
    },
    setPageBook: (state, action: {payload: number, type: string}) => {
      state.pageFromBook = action.payload;
    }
  }
})