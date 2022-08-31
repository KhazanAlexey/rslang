import React from 'react'
import { wordsAPI } from '../../services/WordsService'
import styles from './Words.module.scss'

interface PropsType {
  word: string
  wordTranslate: string
}

const Word: React.FC<PropsType> = (props) => {
  const { word, wordTranslate } = props

  return (
    <>
      <li className={styles.word}>
        <button className={styles.wordButton}>
          <p className={styles.wordWord}>{word}</p>
          <p className={styles.wordTranslate}>{wordTranslate}</p>
        </button>
      </li>
    </>
  )
}

const Words: React.FC<any> = (settings: any) => {
  const { page, lvl } = settings;
  const {
    data: words,
    isLoading: isLoadingWords,
    error: errorWords,
    refetch,
  } = wordsAPI.useFetchWordsQuery({ group: lvl, page: page })
  // const { data: word, isLoading, error } = wordsAPI.useFetchWordByIdQuery('5e9f5ee35eb9e72bc21af4b8')

  return (
    <ul className={styles.words}>
      {words && words.map((word) => <Word word={word.word} wordTranslate={word.wordTranslate} />)}
      {errorWords && <li>Error</li>}
      {isLoadingWords && <li>Loading</li>}
    </ul>
  )
}

export default Words
