import React from 'react'
import { wordsAPI } from '../../services/WordsService'

interface PropsType {
  word: string
  wordTranslate: string
}

const Word: React.FC<PropsType> = (props) => {
  const { word, wordTranslate } = props

  return (
    <>
      <div style={{ width: '100px', height: '50px', border: '1px solid red' }}>
        <span>{word}</span>
        <span>{wordTranslate}</span>
      </div>
    </>
  )
}

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
      {words && words.map((word) => <Word word={word.word} wordTranslate={word.wordTranslate} />)}
      {errorWords && <div>error</div>}
      {isLoadingWords && <div>loading</div>}
    </>
  )
}

export default Words
