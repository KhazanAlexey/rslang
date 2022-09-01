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
    setWordDetail(id);
    console.log(wordDetail)
  }

  return (
    <>
      <li className={styles.word} style={{background: bgGroup}}>
        <button className={clsx({
          [styles.wordButton]: true,
          [styles.wordButtonActive]: id == wordDetail
        })} onClick={viewDetail}>
          <p className={styles.wordWord}>{word}</p>
          <p className={styles.wordTranslate}>{wordTranslate}</p>
        </button>
      </li>
    </>
  )
}

const Words: React.FC<any> = (props) => {
  const { page, lvl, levels, wordDetail, setWordDetail } = props;
  const {
    data: words,
    isLoading: isLoadingWords,
    error: errorWords,
    refetch,
  } = wordsAPI.useFetchWordsQuery({ group: lvl, page: page })
  // const { data: word, isLoading, error } = wordsAPI.useFetchWordByIdQuery('5e9f5ee35eb9e72bc21af4b8')

  // TODO: Сделать при обновлении страницы или уровня, выбор первой карточки
  return (
    <ul className={styles.words}>
      {words && words.map((word, ind) => 
        <Word 
          key={ind} 
          bgGroup={levels[lvl].bg} 
          id={word.id} 
          word={word.word} 
          wordTranslate={word.wordTranslate} 
          wordDetail={wordDetail} 
          setWordDetail={setWordDetail} />)}
      {errorWords && <li>Error</li>}
      {isLoadingWords && <li>Loading</li>}
    </ul>
  )
}

export default Words
