import React from 'react'
import { useAppSelector } from 'src/hooks/redux'
import { localStorageGet } from 'src/utils/localStoradre'
import styles from './StatPage.module.scss'

const StatPage: React.FC<any> = () => {
  const local = localStorageGet(['userId'])
  const { userWords, userWordsIds } = useAppSelector((state) => state.userWords)
  

  // console.log(userWords)
  // console.log(userWordsIds)
  //  15:
  // id: "6318bbb5e9bcac0016921551"
  // optional: {attempts: 1, successAttempts: 1}
  // wordId: "5e9f5ee35eb9e72bc21af5bf"

  const allAttempts = userWords.reduce((sum, currentWord) => sum + (currentWord.optional?.attempts ?? 0), 0);
  const allSuccessAttempts = userWords.reduce((sum, currentWord) => sum + (currentWord.optional?.successAttempts ?? 0), 0);

  const allPercentRight = Math.floor(allSuccessAttempts / (allAttempts / 100))

  // TODO: ВОЗМОЖНО НЕПРАВИЛЬНАЯ ПРОВЕРКА НА ПУСТОЙ USERWORDS
  return (
    <div className={styles.stat}>
      <section className={styles.statInfo}>
        <div className={globalThis.globalStyles.container}>
          <h1 className={globalThis.globalStyles.pageTitle}>Статистика</h1>
          <p className={styles.statDescr}>Скоро тут будет страница статистики</p>
          {userWords && <div>
            <ul>
              {userWords.map((word, ind) => <p key={ind}>Слово: {word.wordId}, попыток: {word.optional?.attempts}, успешных: {word.optional?.successAttempts ?? '0'}</p>)}
            </ul>
            <p>Всего попыток со словами: {allAttempts}</p>
            <p>Из них успешных: {allSuccessAttempts}</p>
            <p>Правильных: {allPercentRight}%</p>
          </div>}
        </div>
      </section>
    </div>
  )
}

export default StatPage
