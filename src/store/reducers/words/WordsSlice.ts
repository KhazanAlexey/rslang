import { createSlice } from '@reduxjs/toolkit'
import { IWord } from '../../../models/IWord'

interface UserState {
  words: IWord[]
  isLoading: boolean
  error: string
}

const initialState: UserState = {
  words: [],
  isLoading: false,
  error: '',
}

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    // setWords: (state, action: PayloadAction<IWord[]>) => {
    //   state.words = action.payload
    // },
  },
  // extraReducers: {
  //     [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IWord[]>) => {
  //         state.isLoading = false;
  //         state.error = ''
  //         state.words = action.payload;
  //     },
  //     [fetchUsers.pending.type]: (state) => {
  //         state.isLoading = true;
  //     },
  //     [fetchUsers.rejected.type]: (state,  action: PayloadAction<string>) => {
  //         state.isLoading = false;
  //         state.error = action.payload
  //     },
  // }
})

export default wordsSlice.reducer
