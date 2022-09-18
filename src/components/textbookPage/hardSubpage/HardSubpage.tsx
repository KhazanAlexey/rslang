import React from 'react'
import Words from 'src/components/words/Words'

const HardSubpage: React.FC<any> = (props) => {
  const {
    wordDetail,
    setWordDetail,
    difficultUserWords,
    isLoadingHardWords,
    difficultWordsError: error,
  } = props

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
