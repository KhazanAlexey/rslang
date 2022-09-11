import React, { useEffect, useId } from 'react'
import Button from '../common/button/Button'
import styles from './GamesOverScreen.module.scss'
import { useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { userWordsAPI } from 'src/services/UsersWordsService'
import { localStorageGet } from 'src/utils/localStoradre'
import { getDateFromRu, getNowDateRu } from 'src/utils/date-helper'
import { IDateStat, IUsersWords } from 'src/models/IUsersWords'
import { IWord } from 'src/models/IWord'

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
  const answersIds = (answers: IWord[]) => {
    return answers.map((word) => word.id)
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
  // const allAnswerID = [...wrongAnswersID, ...correctAnswersID]

  // ========================================================================================================================================================
  // Пересчет по каждому слову кол-ва всех видов попыток для отправки уникального запроса

  const sumAttempts = (correctAnswersArrID: string[], wrongAnswersArrID: string[]) => {
    const arr: {id: string, attempts: number, successAttempts: number}[] = []
    if (correctAnswersArrID.length) {
      correctAnswersArrID.forEach((id) => {
        if (arr.length) {
          const indexRepeat = arr.findIndex((el) => el.id === id)
          if (indexRepeat < 0) {
            arr.push({ id: id, attempts: 1, successAttempts: 1 })
          } else {
            arr[indexRepeat].attempts += 1
            arr[indexRepeat].successAttempts += 1
          }
        } else {
          arr.push({ id: id, attempts: 1, successAttempts: 1 })
        }
      })
    }
    if (wrongAnswersArrID.length) {
      wrongAnswersArrID.forEach((id) => {
        if (arr.length) {
          const indexRepeat = arr.findIndex((el) => el.id === id)
          if (indexRepeat < 0) {
            arr.push({ id: id, attempts: 1, successAttempts: 0 })
          } else {
            arr[indexRepeat].attempts += 1
          }
        } else {
          arr.push({ id: id, attempts: 1, successAttempts: 0 })
        }
      })
    }
    return arr
  }

  const allAnswerID = sumAttempts(correctAnswersID, wrongAnswersID)



  // ========================================================================================================================================================
  const nowDateRu = getNowDateRu()

  // First Attempts Options
  const firstAttemptsOptions = (resultWord: {id: string, attempts: number, successAttempts: number}) => {
    const { attempts, successAttempts } = resultWord
    return {
      attempts,
      successAttempts,
      history:JSON.stringify( [{
        date: nowDateRu,
        gamesStat: {
          audioCall: {
            attempts: game === 'audioCall' ? attempts : 0,
            successAttempts: game === 'audioCall' ? successAttempts : 0,
            maxSeries: 0 // TODO: прикрутить логику максимальных серий
          },
          sprint: {
            attempts: game === 'sprint' ? attempts : 0,
            successAttempts: game === 'sprint' ? successAttempts : 0,
            maxSeries: 0 // TODO: прикрутить логику максимальных серий
          }
        }
      }])
    }
  }
  // Update Options
  const updateAttemptsOptions = (currentWord: IUsersWords, resultWord: {id: string, attempts: number, successAttempts: number}) => {
    const attempts = (currentWord?.optional?.attempts ?? 0) + resultWord.attempts
    const successAttempts = (currentWord?.optional?.successAttempts ?? 0) + resultWord.successAttempts
    const oldHistory = currentWord?.optional?.history ? JSON.parse(currentWord?.optional?.history) : []
    const history: IDateStat[] = []
    const newDayStat = {
      date: nowDateRu,
      gamesStat: {
        audioCall: {
          attempts: game === 'audioCall' ? attempts : 0,
          successAttempts: game === 'audioCall' ? successAttempts : 0,
          maxSeries: game === 'audioCall' ? 0 : 0
        },
        sprint: {
          attempts: game === 'sprint' ? attempts : 0,
          successAttempts: game === 'sprint' ? successAttempts : 0,
          maxSeries: game === 'sprint' ? 0 : 0
        }
      }
    }
    if (oldHistory.length) {
      // Проверяем есть ли статистика на сегодняшний день
      const historyNowDay = oldHistory.find((day) => day.date === nowDateRu)
      if (historyNowDay) { // Статистика за сегодняшний день уже есть
        const oldDayAudioCall = historyNowDay.gamesStat.audioCall
        const oldDaySprint = historyNowDay.gamesStat.sprint
        const updateDayStat = {
          date: nowDateRu,
          gamesStat: {
            audioCall: {
              attempts: game === 'audioCall' ? oldDayAudioCall.attempts + resultWord.attempts : oldDayAudioCall.attempts,
              successAttempts: game === 'audioCall' ? oldDayAudioCall.successAttempts + resultWord.successAttempts : oldDayAudioCall.successAttempts,
              maxSeries: game === 'audioCall' ? 0 : 0 // TODO: MAXSERIES
            },
            sprint: {
              attempts: game === 'sprint' ? oldDaySprint.attempts + resultWord.attempts : oldDaySprint.attempts,
              successAttempts: game === 'sprint' ? oldDaySprint.successAttempts + resultWord.successAttempts : oldDaySprint.successAttempts,
              maxSeries: game === 'sprint' ? 0 : 0 // TODO: MAXSERIES
            }
          }
        }
        history.push(...oldHistory)
        const indexDay = history.findIndex((day) => day.date === nowDateRu)
        history.splice(indexDay, 1, updateDayStat)
      } else { // Если статистики на сегодня нету, то
      // добавляем в старый массив новую статистику с сегодняшней датой
        history.push(...oldHistory, newDayStat)
      }
    } else { // Если история в принципе отсутствует
      history.push(newDayStat)
    }
    return {
      attempts,
      successAttempts,
      history: JSON.stringify(history)
    }
  }

  // ========================================================================================================================================================

  useEffect(() => {
    if (local) {
      allAnswerID.forEach((answerId) => {
        if (userWordsIds.includes(answerId.id)) {
          const currentWord = userWords[answerId.id]
          const difficulty = currentWord?.difficulty ?? 'learn'
          const optional = updateAttemptsOptions(currentWord, answerId)
          updateUserWord({
            id: local['userId'],
            wordId: answerId.id,
            difficulty,
            optional
          })
        } else {
          const currentWord = userWords[answerId.id]
          const difficulty = currentWord?.difficulty ?? 'learn'
          const optional = firstAttemptsOptions(answerId)
          postUserWord({
            id: local['userId'],
            wordId: answerId.id,
            difficulty,
            optional
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
