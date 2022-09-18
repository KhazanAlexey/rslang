import React from 'react'
import Words from 'src/components/words/Words'

const CompleteSubpage: React.FC<any> = (props) => {
  const {
    wordDetail,
    setWordDetail,
    completedUserWords,
    isLoadingComplete: isLoading,
    errorComplete: error,
  } = props

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
