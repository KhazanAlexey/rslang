import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import React from 'react'
import Words from 'src/components/words/Words'
import { IAggreratedWords } from 'src/models/IUsersWords'

type PropsType = {
  wordDetail: string
  setWordDetail: React.Dispatch<string>
  difficultUserWords: IAggreratedWords
  isLoadingHardWords: boolean
  difficultWordsError: FetchBaseQueryError | undefined
}

const HardSubpage: React.FC<PropsType> = ({
  wordDetail,
  setWordDetail,
  difficultUserWords,
  isLoadingHardWords,
  difficultWordsError: error,
}) => {
  const isEmpty = !difficultUserWords?.[0].paginatedResults.find(
    (x) => x.userWord.difficulty == 'hard',
  )
  return (
    <div className={globalThis.globalStyles.bookWords}>
      {isEmpty && <p>Пока сложных слов нет</p>}
      <Words
        words={difficultUserWords?.[0].paginatedResults}
        errorWords={error}
        isLoadingWords={isLoadingHardWords}
        wordDetail={wordDetail}
        setWordDetail={setWordDetail}
      />
    </div>
  )
}

export default HardSubpage
