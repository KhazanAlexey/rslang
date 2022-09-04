import React, { useEffect } from 'react'
import { clsx } from 'src/utils/clsx'
import { wordsAPI } from '../../services/WordsService'
import styles from './Words.module.scss'

interface PropsType {
  bgGroup: string
  id: string
  word: string
  wordTranslate: string
  wordDetail: string
  setWordDetail: any
}

const Word: React.FC<PropsType> = (props) => {
  const { bgGroup, id, word, wordTranslate, wordDetail, setWordDetail } = props

  const viewDetail = () => {
    setWordDetail(id)
    console.log(wordDetail)
  }

  return (
    <>
      <li className={styles.word} style={{ background: bgGroup }}>
        <button
          className={clsx({
            [styles.wordButton]: true,
            [styles.wordButtonActive]: id == wordDetail,
          })}
          onClick={viewDetail}
        >
          <p className={styles.wordWord}>{word}</p>
          <p className={styles.wordTranslate}>{wordTranslate}</p>
        </button>
      </li>
    </>
  )
}

const Words: React.FC<any> = (props) => {
  const { page, words, errorWords, isLoadingWords, lvl, levels, wordDetail, setWordDetail } = props

  return (
    <ul className={styles.words}>
      {words &&
        words.map((word, ind) => (
          <Word
            key={ind}
            bgGroup={levels ? levels[lvl].bg : 'red'}
            id={word.id}
            word={word.word}
            wordTranslate={word.wordTranslate}
            wordDetail={wordDetail}
            setWordDetail={setWordDetail}
          />
        ))}
      {errorWords && <li>Error</li>}
      {isLoadingWords && <li>Loading</li>}
    </ul>
  )
}

export default Words
