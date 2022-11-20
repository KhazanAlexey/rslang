import React, { useEffect, useState } from 'react'
import { wordsAPI } from 'src/services/WordsService'
import { clsx } from 'src/utils/clsx'
import styles from './Detail.module.scss'
import { useAudio } from '../../../hooks/useAudio'
import { userWordsAPI } from '../../../services/UsersWordsService'
import { localStorageGet } from '../../../utils/localStorage'
import { useAppSelector } from '../../../hooks/redux'
import { useDispatch } from 'react-redux'
import { userWordsSlice } from '../../../store/reducers/userWordsSlice'

type PropsType = {
  id: string
  complete: boolean
  hard: boolean
  subpage: string
}
const Detail: React.FC<PropsType> = ({ id, complete: isComplete, hard: isHard }) => {
  const { isAuth } = useAppSelector((state) => state.auth)
  const dispatch = useDispatch()
  const userid = localStorage.getItem('userId') || ''
  const [skip, setSkip] = useState(true)
  const { data: wordData, refetch } = wordsAPI.useFetchWordByIdQuery(id)
  const { data: userWord, refetch: refetchUserWord } = userWordsAPI.useFetchUserWordQuery(
    { id: userid, wordId: id },
    { skip },
  )
  useEffect(() => {
    if (id) {
      refetch()
      refetchUserWord()
    }
  }, [id])
  useEffect(() => {
    if (isAuth) {
      setSkip(false)
    }
  }, [isAuth])
  const { userWords, userWordsIds } = useAppSelector((state) => state.userWords)

  const statWord = userWords.find((word) => word.wordId == id)
  const beInGameWord = statWord ? statWord.optional?.attempts ?? 0 : 0
  const successWord = statWord ? statWord.optional?.successAttempts ?? 0 : 0
  const wrongWord = beInGameWord - successWord

  const [postWord] = userWordsAPI.usePostUserWordMutation()
  const [updateUserWord] = userWordsAPI.useUpdateUserWordMutation()
  const [deleteWord] = userWordsAPI.useDeleteUserWordMutation()
  const local = localStorageGet(['userId'])
  const [playing, toggle] = useAudio(
    wordData?.audio && `https://rs-lang-193.herokuapp.com/${wordData?.audio}`,
  )
  const [playingMeaning, meaningToggle] = useAudio(
    wordData?.audioMeaning && `https://rs-lang-193.herokuapp.com/${wordData?.audioMeaning}`,
  )
  const [playingExample, exampleToggle] = useAudio(
    wordData?.audioExample && `https://rs-lang-193.herokuapp.com/${wordData?.audioExample}`,
  )

  const [isStatOpen, setIsStatOpen] = useState(false)

  const stathandler = () => {
    isStatOpen ? setIsStatOpen(false) : setIsStatOpen(true)
  }
  // TODO: сделать логику добавления в сложные
  // useEffect(() => {
  //  if (isComplete) {
  //  }
  // }, [])
  // console.log('USER WORD')
  // console.log(userWordsIds)
  const hardHandler = () => {
    if (userWordsIds && userWordsIds.includes(id)) {
      const findWord = userWords.find((word) => word.wordId === id)
      if (findWord) {
        dispatch(userWordsSlice.actions.deleteHardWord(id))
        if (findWord.difficulty === 'hard') {
          // UPDATE TO LEARN
          if (findWord.optional) {
            updateUserWord({ id: local['userId'], difficulty: 'learn', wordId: id })
          } else {
            const optional = findWord.optional
            updateUserWord({ id: local['userId'], difficulty: 'learn', wordId: id, optional })
          }
        } else {
          // UPDATE TO HARD
          if (findWord.optional) {
            updateUserWord({ id: local['userId'], difficulty: 'hard', wordId: id })
          } else {
            const optional = findWord.optional
            updateUserWord({ id: local['userId'], difficulty: 'hard', wordId: id, optional })
          }
        }
      } else {
        // POST
        postWord({ id: local['userId'], difficulty: 'hard', wordId: id })
      }
    } else {
      // POST
      postWord({ id: local['userId'], difficulty: 'hard', wordId: id })
    }
  }
  // TODO: сделать логику добавления в изученные
  const completeHandler = () => {
    if (userWordsIds && userWordsIds.includes(id)) {
      const findWord = userWords.find((word) => word.wordId === id)
      if (findWord) {
        if (findWord.difficulty === 'completed') {
          // UPDATE TO LEARN
          dispatch(userWordsSlice.actions.deleteCompletedWord(id))
          if (findWord.optional) {
            updateUserWord({ id: local['userId'], difficulty: 'learn', wordId: id })
          } else {
            const optional = findWord.optional
            updateUserWord({ id: local['userId'], difficulty: 'learn', wordId: id, optional })
          }
        } else {
          // UPDATE TO HARD
          if (findWord.optional) {
            updateUserWord({ id: local['userId'], difficulty: 'completed', wordId: id })
          } else {
            const optional = findWord.optional
            updateUserWord({ id: local['userId'], difficulty: 'completed', wordId: id, optional })
          }
        }
      } else {
        // POST
        postWord({ id: local['userId'], difficulty: 'completed', wordId: id })
      }
    } else {
      // POST
      postWord({ id: local['userId'], difficulty: 'completed', wordId: id })
    }
  }
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
            <p className={styles.detailText}>{wordData ? wordData.textMeaningTranslate : ''}</p>
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
        {isAuth && !beInGameWord && (
          <div className={styles.detailStat}>
            <h4>Еще не встречалось в играх</h4>
          </div>
        )}
        {isAuth && beInGameWord && (
          <div
            className={clsx({
              [styles.detailStat]: true,
              [styles.detailStatHave]: true,
              [styles.detailStatOpen]: isStatOpen,
            })}
            onClick={stathandler}
          >
            <h4>Статистика по слову</h4>
            <p>Встречалось в играх {beInGameWord}</p>
            <p>Отгадано {successWord}</p>
            <p>Не отгадано {wrongWord}</p>
          </div>
        )}
        <img
          src={wordData?.image && `https://rs-lang-193.herokuapp.com/${wordData.image}`}
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
