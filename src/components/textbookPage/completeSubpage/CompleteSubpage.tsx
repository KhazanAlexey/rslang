import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import React from 'react'
import Words from 'src/components/words/Words'
import { IAggreratedWords, IUsersWords } from 'src/models/IUsersWords'
import { IWord } from 'src/models/IWord'

// type compWords = { paginatedResults: (IUsersWords & { userWord: IUsersWords })[] }[]
// type compWords = IUsersWords[]

type PropsType = {
  hardWords: IWord[]
  setHardWords: React.Dispatch<IWord[]>
  wordDetail: string
  setWordDetail: React.Dispatch<string>
  completedUserWords: IAggreratedWords // compWords
  isLoadingComplete: boolean
  errorComplete: FetchBaseQueryError | undefined
}

const CompleteSubpage: React.FC<PropsType> = ({
  wordDetail,
  setWordDetail,
  completedUserWords,
  isLoadingComplete: isLoading,
  errorComplete: error,
}) => {
  const isEmpty = !completedUserWords?.[0].paginatedResults.find(
    (x) => x.userWord.difficulty == 'completed',
  )

  return (
    <div className={globalThis.globalStyles.bookWords}>
      {isEmpty && <p>Пока изученных слов нет</p>}
      <Words
        words={completedUserWords?.[0].paginatedResults}
        errorWords={error}
        isLoadingWords={isLoading}
        wordDetail={wordDetail}
        setWordDetail={setWordDetail}
      />
    </div>
  )
}

export default CompleteSubpage
