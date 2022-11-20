import React from 'react'
import { useAppSelector } from 'src/hooks/redux'
import { IDateStat, IUsersWordsOptional } from 'src/models/IUsersWords'
import { getDateFromRu, getDateInRu, getNowDateRu } from 'src/utils/date-helper'
import { localStorageGet } from 'src/utils/localStorage'
import styles from './StatPage.module.scss'

const StatPage = () => {
  const local = localStorageGet(['userId'])
  const { userWords, userWordsIds } = useAppSelector((state) => state.userWords)

  // console.log(userWords)
  // console.log(userWordsIds)
  //  15:
  // id: "6318bbb5e9bcac0016921551"
  // optional: {attempts: 1, successAttempts: 1}
  // wordId: "5e9f5ee35eb9e72bc21af5bf"

  const nowDay = getNowDateRu()
  const nowDayDate = getDateFromRu(nowDay)

  // ========================================================================================================================================================

  // const checkIsNew = (history: IDateStat) => {}
  // 1. Сортируем массив слов по датам
  // 2. Функция для создания объекта статистики за конкретный день
  // 3. Доп.функция для проверки нет ли более свежей статистики
  const dateWordBecameNew = (history: IDateStat[]) => {
    return history.reduce((firstDateUse, dayStat) => {
      if (dayStat.gamesStat.audioCall.attempts || dayStat.gamesStat.sprint.attempts) {
        const currentDate = getDateFromRu(dayStat.date)
        if (currentDate < firstDateUse) {
          return currentDate
        } else return nowDayDate
      } else return nowDayDate
    }, nowDayDate)
  }

  const getRightPercent = (attempts: number, success: number) => {
    if (attempts === 0 || success === 0) return 0
    return Math.round(success / (attempts / 100))
  }

  const getDayStat = (findDay: string) => {
    const findDayDate = getDateFromRu(findDay)
    const wordsStat = { new: 0, learned: 0, rightPercent: 0 }
    const audioCallStat = { new: 0, rightPercent: 0, maxSeries: 0 }
    const sprintStat = { new: 0, rightPercent: 0, maxSeries: 0 }
    let attemptsDay = 0
    let successAttemptsDay = 0
    let audioCallAttemptsDay = 0
    let audioCallSuccessAttemptsDay = 0
    let sprintAttemptsDay = 0
    let sprintSuccessAttemptsDay = 0
    if (userWords) {
      userWords.forEach((word) => {
        if (word.optional) {
          const { optional } = word
          const history: IDateStat[] = optional.history?.length ? JSON.parse(optional.history) : []
          if (history && history.length) {
            // Если вообще есть история
            const wordBecameNewDate = dateWordBecameNew(history)
            const wordBecameNewDateRu = getDateInRu(wordBecameNewDate)
            const isCurrentDayFirst = wordBecameNewDate.getTime() === findDayDate.getTime()
            console.log(
              `Сегодняшняя дата: ${findDay}, слово появилось в статистике ${wordBecameNewDateRu}`,
            )
            const nowDayStat = history.find((dayStat) => dayStat.date === findDay)
            if (nowDayStat) {
              // Если есть статистика за сегодня
              const { audioCall, sprint } = nowDayStat.gamesStat
              if ((audioCall.attempts || sprint.attempts) && isCurrentDayFirst) {
                wordsStat.new += 1 // +1 новое слово сегодня
                attemptsDay += audioCall.attempts + sprint.attempts // Добавляем к общему количеству попыток за день попытки по слову
                successAttemptsDay += audioCall.successAttempts + sprint.successAttempts // Добавляем к успешным попыткам за день успешные по слову
              }
              if (audioCall.attempts && isCurrentDayFirst) {
                // Та же логика, что и со словами выше
                audioCallStat.new += 1
                audioCallAttemptsDay += audioCall.attempts
                audioCallSuccessAttemptsDay += audioCall.successAttempts
              }
              if (sprint.attempts && isCurrentDayFirst) {
                // Та же логика, что и со словами выше
                sprintStat.new += 1
                sprintAttemptsDay += sprint.attempts
                sprintSuccessAttemptsDay += sprint.successAttempts
              }
            }
          }
        }
      })
    }
    wordsStat.rightPercent = attemptsDay ? getRightPercent(attemptsDay, successAttemptsDay) : 0
    audioCallStat.rightPercent = attemptsDay
      ? getRightPercent(audioCallAttemptsDay, audioCallSuccessAttemptsDay)
      : 0
    sprintStat.rightPercent = attemptsDay
      ? getRightPercent(sprintAttemptsDay, sprintSuccessAttemptsDay)
      : 0
    return { wordsStat, audioCallStat, sprintStat }
  }

  const nowDayStat = getDayStat(nowDay)

  console.log(nowDayStat)

  const isStat = userWords.find((word) => (word.optional?.attempts ?? 0) > 0)

  const allAttempts = userWords.reduce(
    (sum, currentWord) => sum + (currentWord.optional?.attempts ?? 0),
    0,
  )
  const allSuccessAttempts = userWords.reduce(
    (sum, currentWord) => sum + (currentWord.optional?.successAttempts ?? 0),
    0,
  )

  const allNewWords = userWords.reduce(
    (sum, currentWord) => sum + ((currentWord.optional?.attempts ?? 0) > 0 ? 1 : 0),
    0,
  )
  const allPercentRight = Math.floor(allSuccessAttempts / (allAttempts / 100))

  // TODO: ВОЗМОЖНО НЕПРАВИЛЬНАЯ ПРОВЕРКА НА ПУСТОЙ USERWORDS
  return (
    <div className={styles.stat}>
      <section className={styles.statInfo}>
        <div className={globalThis.globalStyles.container}>
          <h1 className={globalThis.globalStyles.pageTitle}>Статистика</h1>
          <p className={styles.statDescr}>Скоро тут будет страница статистики</p>
          {isStat && (
            <div>
              <h2>За все время</h2>
              {/* <ul>
                {userWords.map((word, ind) => (
                  <p key={ind}>
                    Слово: {word.wordId}, попыток: {word.optional?.attempts ?? 0}, успешных:{' '}
                    {word.optional?.successAttempts ?? '0'}
                  </p>
                ))}
              </ul>*/}
              <p>Новых слов в играх: {allNewWords}</p>
              <p>Всего попыток со словами: {allAttempts}</p>
              <p>Из них успешных: {allSuccessAttempts}</p>
              <p>Процент правильных ответов в играх: {allPercentRight}%</p>
              <h2 style={{ fontWeight: 700 }}>ЗА СЕГОДНЯ</h2>
              <h3 style={{ fontWeight: 700 }}>Слова</h3>
              <ul>
                <li>Новых слов: {nowDayStat.wordsStat.new}</li>
                <li>Правильные: {nowDayStat.wordsStat.rightPercent}%</li>
                <li>Изучено: {nowDayStat.wordsStat.learned}</li>
              </ul>
              <h3 style={{ fontWeight: 700 }}>Аудиовызов</h3>
              <ul>
                <li>Новых слов: {nowDayStat.audioCallStat.new}</li>
                <li>Правильные: {nowDayStat.audioCallStat.rightPercent}%</li>
                <li>Макс. серия: {nowDayStat.audioCallStat.maxSeries}</li>
              </ul>
              <h3 style={{ fontWeight: 700 }}>Спринт</h3>
              <ul>
                <li>Новых слов: {nowDayStat.sprintStat.new}</li>
                <li>Правильные: {nowDayStat.sprintStat.rightPercent}%</li>
                <li>Макс. серия: {nowDayStat.sprintStat.maxSeries}</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default StatPage
