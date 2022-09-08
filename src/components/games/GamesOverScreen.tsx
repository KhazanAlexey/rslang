import React, { useEffect, useId } from 'react'
import Button from '../common/button/Button'
import styles from './GamesOverScreen.module.scss'
import { useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { userWordsAPI } from 'src/services/UsersWordsService'
import { localStorageGet } from 'src/utils/localStoradre'
import { IPostUsersWord } from 'src/models/IUsersWords'

type PropsType = {
  game?: string
}

const GamesOverScreen: React.FC<PropsType> = ({ game = 'audioCall' }) => {
  const navigate = useNavigate()

  const { wrongAnswers: wrongAnswersSprint, correctAnswers: correctAnswersSprint } = useAppSelector(
    (state) => state.sprint,
  )
  const local = localStorageGet(['userId'])
  const { userWords, userWordsIds } = useAppSelector((state) => state.userWords)
  const { wrongAnswers: wrongAnswersAudioCAll, correctAnswers: correctAnswersAudioCall } =
    useAppSelector((state) => state.audioCall)
  const [updateUserWord] = userWordsAPI.useUpdateUserWordMutation()
  const [postUserWord] = userWordsAPI.usePostUserWordMutation()
  let correctAnswers
  let wrongAnswers
  const answersIds = (wrong: IPostUsersWord[]): string[] => {
    return wrong.map((word) => word.id)
  }

  const found = (arr1, arr2) => {
    return arr1.some((r) => arr2.indexOf(r) >= 0)
  }

  if (game === 'sprint') {
    correctAnswers = correctAnswersSprint
    wrongAnswers = wrongAnswersSprint
  }
  if (game === 'audioCall') {
    correctAnswers = correctAnswersAudioCall
    wrongAnswers = wrongAnswersAudioCAll
  }
  const wrongAnswersID = answersIds(wrongAnswers)
  const correctAnswersID = answersIds(correctAnswers)
  const allAnswerID = [...wrongAnswersID, ...correctAnswersID]

  useEffect(() => {
    if (local) {
      correctAnswersID.forEach((answerId) => {
        if (userWordsIds.includes(answerId)) {
          const currentWord = userWords[answerId]
          const attempts = currentWord?.optional?.attempts || 0
          const successAttempts = currentWord?.optional?.successAttempts || 0
          updateUserWord({
            id: local['userId'],
            wordId: id,
            optional: { attempts: attempts + 1, successAttempts: successAttempts + 1 },
          })
        } else {
          postUserWord({
            id: local['userId'],
            wordId: answerId,
            optional: { attempts: 1, successAttempts: 1 },
          })
        }
      })

      wrongAnswersID.forEach((answerId) => {
        if (userWordsIds.includes(answerId)) {
          const currentWord = userWords[answerId]
          const attempts = currentWord?.optional?.attempts || 0
          updateUserWord({
            id: local['userId'],
            wordId: id,
            optional: { attempts: attempts + 1 },
          })
        } else {
          postUserWord({
            id: local['userId'],
            wordId: answerId,
            optional: { attempts: 1 },
          })
        }
      })
    }
  }, [])

  const id = useId()
  const exitGameHandler = () => {
    navigate('/games')
  }
  return (
    <>
      <div className={styles.overGroup}>
        <h3 className={styles.overTitle}>Правильные ответы:</h3>
        <ol className={styles.overList}>
          {correctAnswers.map((el, index) => (
            <li className={styles.overItem} key={`${id}-${index}`}>
              {el.word} - {el.wordTranslate}
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.overGroup}>
        <h3 className={styles.overTitle}>Ошибки:</h3>
        <ol className={styles.overList}>
          {wrongAnswers.map((el, index) => (
            <li className={styles.overItem} key={`${id}-${index}`}>
              {el.word} - {el.wordTranslate}
            </li>
          ))}
        </ol>
      </div>
      <Button text='Выход' onClick={exitGameHandler} />
    </>
  )
}

export default GamesOverScreen
