import React from 'react'
import { wordsAPI } from '../../services/WordsService'

const Words: React.FC<any> = () => {
  const {
    data: words,
    isLoading: isLoadingWords,
    error: errorWords,
    refetch,
  } = wordsAPI.useFetchWordsQuery({})
  // const { data: word, isLoading, error } = wordsAPI.useFetchWordByIdQuery('5e9f5ee35eb9e72bc21af4b8')

  return (
    <>
      {words &&
        words.map((word) => (
          <div key={word.id}>
            {word.word}
            {word.id}
            {word.wordTranslate}
            {word.group}
          </div>
        ))}
      {errorWords && <div>error</div>}
      {isLoadingWords && <div>loading</div>}
    </>
  )
}

export default Words
