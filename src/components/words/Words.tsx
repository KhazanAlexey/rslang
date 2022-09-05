import React, { useEffect } from 'react'
import { useAppSelector } from 'src/hooks/redux'
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
  isHard: boolean
  isCompleted: boolean
}

const Word: React.FC<PropsType> = (props) => {
  const { bgGroup, id, word, wordTranslate, wordDetail, setWordDetail, isHard, isCompleted } = props

  const viewDetail = () => {
    setWordDetail(id)
    console.log(wordDetail)
  }

  return (
    <>
      <li
        className={clsx({
          [styles.word]: true,
          ['_icon-bookmark']: isHard
        })}
        style={{ background: bgGroup }}
      >
        <button
          className={clsx({
            [styles.wordButton]: true,
            [styles.wordButtonActive]: id == wordDetail,
            [styles.wordComplete]: isCompleted
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
  const { words, errorWords, isLoadingWords, lvl, levels, wordDetail, setWordDetail } = props

  const { hardWordsIds, completedWordsIds } = useAppSelector((state) => state.userWords)

  return (
    <ul className={styles.words}>
      {words &&
        words.map((word, ind) => (
          <Word
            key={ind}
            bgGroup={levels ? levels[lvl].bg : '#FFAFAF'}
            id={word.id ?? word._id}
            word={word.word}
            wordTranslate={word.wordTranslate}
            wordDetail={wordDetail}
            setWordDetail={setWordDetail}
            isHard={hardWordsIds.includes(word.id ?? word._id)}
            isCompleted={completedWordsIds.includes(word.id ?? word._id)}
          />
        ))}
      {errorWords && <li>Error</li>}
      {isLoadingWords && <li>Loading</li>}
    </ul>
  )
}

export default Words
