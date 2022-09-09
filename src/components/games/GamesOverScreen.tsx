import React, { useEffect, useId } from 'react'
import Button from '../common/button/Button'
import styles from './GamesOverScreen.module.scss'
import { useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { userWordsAPI } from 'src/services/UsersWordsService'
import { localStorageGet } from 'src/utils/localStoradre'
import { getDateFromRu, getNowDateRu } from 'src/utils/date-helper'
import { IDateStat, IUsersWords } from 'src/models/IUsersWords'

const GamesOverScreen: React.FC<any> = ({ game = 'audioCall' }) => {
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
  const answersIds = (wrong: any) => {
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

  // ========================================================================================================================================================
  const nowDateRu = getNowDateRu()
  getDateFromRu(nowDateRu);

  // First Attempt Options
  const firstAttemptOptions = (result: boolean) => {
    return {
      attempts: 1,
      successAttemts: +result,
      history: [{
        date: nowDateRu,
        gamesStat: {
          audioCall: {
            attempts: game === 'audioCall' ? +result : 0,
            successAttempts: game === 'audioCall' ? +result : 0
          },
          sprint: {
            attempts: game === 'sprint' ? +result : 0,
            successAttempts: game === 'sprint' ? +result : 0
          }
        }
      }]
    }
  }
  // Update Options
  const updateOptions = (currentWord: IUsersWords, result: boolean) => {
    const attempts = (currentWord?.optional?.attempts ?? 0) + 1
    const successAttempts = (currentWord?.optional?.successAttempts ?? 0) + +result
    const history = currentWord?.optional?.history ?? []
    const newHistory: IDateStat[] = []
    if (history.length) {
      // Проверяем есть ли статистика на сегодняшний день
      const historyNowDay = history.find((day) => day.date === nowDateRu)
      if (historyNowDay) { // Статистика за сегодняшний день уже есть
        
      }
      // Если статистики на сегодня нету, то 
      // добавляем в массив новую статистику с сегодняшней датой
    } else {
      // Если история пуста
      // const newDayStat = {
      //  date: nowDateRu,
      //  gamesStat: {
      //    audioCall: {
      //      attempts: game === 'audioCall' ? 
      //    },
      //    sprint: {

      //    }
      //  }
      // }
      // newHistory.push(newDayStat)
    }
    return {
      attempts: 1,
      successAttemts: +result,
      history: [{
        date: nowDateRu,
        gamesStat: {
          audioCall: {
            attempts: game === 'audioCall' ? +result : 0,
            successAttempts: game === 'audioCall' ? +result : 0
          },
          sprint: {
            attempts: game === 'sprint' ? +result : 0,
            successAttempts: game === 'sprint' ? +result : 0
          }
        }
      }]
    }
  }

  // ========================================================================================================================================================

  /* 
    {
      attempts: number
      successAttempts: number
      learned: boolean
      attempts: [
        {
          date: string,
          gamesStat: {
            audiocall: {
              attempts: number,
              successAttempts: number
            },
            sprint: {
              attempts: number,
              successAttempts: number
            }
          }
        },
        {
          date: string,
          gamesStat: {
            audiocall: {
              attempts: number,
              successAttempts: number
            },
            sprint: {
              attempts: number,
              successAttempts: number
            }
          }
        },
      ]
    }
  */

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
            optional: { 
              attempts: attempts + 1, 
              successAttempts: successAttempts + 1,
            },
          })
        } else {          
          postUserWord({
            id: local['userId'],
            wordId: answerId,
            optional: firstAttemptOptions(true),
          })
        }
      })

      wrongAnswersID.forEach((answerId) => {
        if (userWordsIds.includes(answerId)) {
          const currentWord = userWords[answerId]
          const attempts = currentWord?.optional?.attempts || 0
          // const attemptsAudiocall = currentWord?.optional?.attemptsAudiocall || 0
          // const attemptsSprint = currentWord?.optional?.attemptsSprint || 0
          updateUserWord({
            id: local['userId'],
            wordId: id,
            optional: { attempts: attempts + 1 },
          })
        } else {
          postUserWord({
            id: local['userId'],
            wordId: answerId,
            optional: firstAttemptOptions(false),
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
