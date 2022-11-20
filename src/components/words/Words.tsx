import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import React, { useEffect } from 'react'
import { useAppSelector } from 'src/hooks/redux'
import { LvlType } from 'src/models/IGamesSettings'
import { IWord } from 'src/models/IWord'
import { clsx } from 'src/utils/clsx'
import { wordsAPI } from '../../services/WordsService'
import styles from './Words.module.scss'

interface PropsTypeWord {
  bgGroup: string
  id: string
  word: string
  wordTranslate: string
  wordDetail: string
  setWordDetail: React.Dispatch<string>
  isHard: boolean
  isCompleted: boolean
}

const Word: React.FC<PropsTypeWord> = ({
  bgGroup,
  id,
  word,
  wordTranslate,
  wordDetail,
  setWordDetail,
  isHard,
  isCompleted,
}) => {
  const viewDetail = () => {
    setWordDetail(id)
  }

  return (
    <>
      <li
        className={clsx({
          [styles.word]: true,
          ['_icon-bookmark']: isHard,
        })}
        style={{ background: bgGroup }}
      >
        <button
          className={clsx({
            [styles.wordButton]: true,
            [styles.wordButtonActive]: id == wordDetail,
            [styles.wordComplete]: isCompleted,
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

type PropsTypeWords = {
  words: (IWord & { _id?: string })[]
  errorWords?: FetchBaseQueryError
  isLoadingWords: boolean
  lvl?: number
  levels?: LvlType[]
  wordDetail: string
  setWordDetail: React.Dispatch<string>
  page?: number
}

const Words: React.FC<PropsTypeWords> = ({
  words,
  errorWords,
  isLoadingWords,
  lvl,
  levels,
  wordDetail,
  setWordDetail,
}) => {
  const { hardWordsIds, completedWordsIds } = useAppSelector((state) => state.userWords)
  return (
    <ul className={styles.words}>
      {words &&
        words.map((word, ind) => (
          <Word
            key={ind}
            bgGroup={levels && lvl ? levels[lvl].bg : '#FFAFAF'}
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
