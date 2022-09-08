import React, { useEffect, useState } from 'react'
import { wordsAPI } from 'src/services/WordsService'
import { clsx } from 'src/utils/clsx'
import styles from './Detail.module.scss'
import { IWord } from '../../../models/IWord'
import { useAudio } from '../../../hooks/useAudio'
import { userWordsAPI } from '../../../services/UsersWordsService'
import { localStorageGet } from '../../../utils/localStoradre'
import { useAppSelector } from '../../../hooks/redux'
import { useDispatch } from 'react-redux'
import { userWordsSlice } from '../../../store/reducers/userWordsSlice'

const Detail: React.FC<any> = (props) => {
  const { isAuth } = useAppSelector((state) => state.auth)
  const { id, complete: isComplete, hard: isHard } = props
  const dispatch = useDispatch()
  const userid = localStorage.getItem('userId') || ''
  const { data: wordData, refetch } = wordsAPI.useFetchWordByIdQuery(id)
  const { data: userWord } = userWordsAPI.useFetchUserWordQuery({ id: userid, wordId: id })
  useEffect(() => {
    refetch()
  }, [id])

  const { userWords, userWordsIds } = useAppSelector((state) => state.userWords)

  const statWord = userWords.find((word) => word.wordId == id);
  const beInGameWord = statWord ? (statWord.optional?.attempts ?? 0) : 0
  const successWord = statWord ? (statWord.optional?.successAttempts ?? 0) : 0
  const wrongWord = beInGameWord - successWord

  const [postWord] = userWordsAPI.usePostUserWordMutation()
  const [updateUserWord] = userWordsAPI.useUpdateUserWordMutation()
  const [deleteWord] = userWordsAPI.useDeleteUserWordMutation()
  const local = localStorageGet(['userId'])
  const [playing, toggle] = useAudio(`https://rs-lang-193.herokuapp.com/${wordData?.audio}`)
  const [playingMeaning, meaningToggle] = useAudio(
    `https://rs-lang-193.herokuapp.com/${wordData?.audioMeaning}`,
  )
  const [playingExample, exampleToggle] = useAudio(
    `https://rs-lang-193.herokuapp.com/${wordData?.audioExample}`,
  )

  const [isStatOpen, setIsStatOpen] = useState(false);

  const stathandler = () => {
    isStatOpen ? setIsStatOpen(false) : setIsStatOpen(true)
  }
  // TODO: сделать логику добавления в сложные

  const hardHandler = () => {
    // @ts-ignore
    dispatch(userWordsSlice.actions.deleteCompletedWord(id))
    // @ts-ignore
    dispatch(userWordsSlice.actions.deleteHardWord(id))
    if (isComplete) {
      updateUserWord({ id: local['userId'], difficulty: 'hard', wordId: id })
    }
    if (isHard) {
      deleteWord({ id: local['userId'], wordId: id })
    }
    if (!isComplete && !isHard) postWord({ id: local['userId'], difficulty: 'hard', wordId: id })
  }
  // TODO: сделать логику добавления в изученные
  const completeHandler = () => {
    // @ts-ignore
    dispatch(userWordsSlice.actions.deleteCompletedWord(id))
    // @ts-ignore
    dispatch(userWordsSlice.actions.deleteHardWord(id))
    if (isHard) {
      // @ts-ignore
      dispatch(userWordsSlice.actions.deleteHardWord(id))
      updateUserWord({ id: local['userId'], difficulty: 'completed', wordId: id })
    }
    if (isComplete) {
      deleteWord({ id: local['userId'], wordId: id })
    }

    if (!isComplete && !isHard)
      postWord({ id: local['userId'], difficulty: 'completed', wordId: id })
  }
  // console.log('userW', userWord)
  const soundHandler = () => {
    toggle()
  }
  const soundMeaningHandler = () => {
    meaningToggle()
  }
  const soundExampleHandler = () => {
    exampleToggle()
  }
  if (!id) return <div></div>
  return (
    <article
      className={clsx({
        [styles.detail]: true,
        [styles.detailComplete]: isComplete,
        [styles.detailHard]: isHard,
      })}
    >
      <div className={styles.detailMain}>
        <h3 className={styles.detailTitle}>{wordData && wordData.word}</h3>
        <button
          className={clsx({
            [styles.detailSound]: true,
            ['_icon-sound']: true,
            [styles.soundOn]: playing,
          })}
          onClick={soundHandler}
        ></button>
        <span className={styles.detailTranscription}>{wordData && wordData.transcription}</span>
        <p className={styles.detailTranslate}>{wordData && wordData.wordTranslate}</p>
        <hr className={styles.detailLine} />
      </div>
      <div className={styles.detailMore}>
        <ul className={styles.detailList}>
          <li className={styles.detailItem}>
            <h4 className={styles.detailSubtitle}>
              Значение слова
              <button
                className={clsx({
                  [styles.detailSound]: true,
                  [styles.detailSubsound]: true,
                  ['_icon-sound']: true,
                  [styles.soundOn]: playingMeaning,
                })}
                onClick={soundMeaningHandler}
              ></button>
            </h4>
            {wordData && (
              <p
                className={styles.detailText}
                dangerouslySetInnerHTML={{ __html: wordData.textMeaning }}
              ></p>
            )}
            <p className={styles.detailText}>{wordData && wordData.textMeaningTranslate}</p>
          </li>
          <li className={styles.detailItem}>
            <h4 className={styles.detailSubtitle}>
              Пример использования
              <button
                className={clsx({
                  [styles.detailSound]: true,
                  [styles.detailSubsound]: true,
                  ['_icon-sound']: true,
                  [styles.soundOn]: playingExample,
                })}
                onClick={soundExampleHandler}
              ></button>
            </h4>
            {wordData && (
              <p
                className={styles.detailText}
                dangerouslySetInnerHTML={{ __html: wordData.textExample }}
              ></p>
            )}
            <p className={styles.detailText}>{wordData && wordData.textExampleTranslate}</p>
          </li>
        </ul>
      </div>
      <div className={styles.detailImage}>
        {isAuth && !statWord && (
          <div className={styles.detailStat}>
            <h4>Еще не встречалось в играх</h4>
          </div>
        )}
        {isAuth && statWord && (
          <div className={clsx({
            [styles.detailStat]: true,
            [styles.detailStatHave]: true,
            [styles.detailStatOpen]: isStatOpen
          })} onClick={stathandler}>
            <h4>Статистика по слову</h4>
            <p>Встречалось в играх {beInGameWord}</p>
            <p>Отгадано {successWord}</p>
            <p>Не отгадано {wrongWord}</p>
          </div>
        )}
        <img
          src={wordData && `https://rs-lang-193.herokuapp.com/${wordData.image}`}
          alt={wordData && wordData.word}
        />
      </div>
      {isAuth && (
        <div className={styles.detailControl}>
          <button
            className={clsx({
              [styles.controlBtn]: true,
              [styles.controlHard]: true,
              ['_icon-bookmark']: true,
            })}
            onClick={hardHandler}
          >
            <span>Сложное</span>
          </button>
          <button
            className={clsx({
              [styles.controlBtn]: true,
              [styles.controlComplete]: true,
              ['_icon-star']: true,
            })}
            onClick={completeHandler}
          >
            <span>Изучено</span>
          </button>
        </div>
      )}
    </article>
  )
}

export default Detail
