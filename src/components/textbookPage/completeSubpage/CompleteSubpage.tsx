import React, { useEffect, useState } from 'react'
import Words from 'src/components/words/Words'
import Detail from '../detail/Detail'
import styles from './CompleteSubpage.module.scss'
import { localStorageGet } from '../../../utils/localStoradre'
import { userWordsAPI } from '../../../services/UsersWordsService'
import { useAppSelector } from '../../../hooks/redux'

const CompleteSubpage: React.FC<any> = (props) => {
  const {
    detail,
    wordDetail,
    setWordDetail,
    completedUserWords,
    isLoadingComplete: isLoading,
    errorComplete: error,
  } = props

  const isEmpty = !completedUserWords?.[0].paginatedResults.find((x) => x.userWord.difficulty == 'completed')

  return (
    <section className=''>
      <section>
        <div className={globalThis.globalStyles.container}>
          <h2 className={globalThis.globalStyles.sectionTitle}>Изученные слова</h2>
        </div>
      </section>
      <section className={styles.complete}>
        <div className={globalThis.globalStyles.container}>
          <div className={globalThis.globalStyles.bookWrapper}>
            <div className={globalThis.globalStyles.bookWords}>
              {isEmpty && <p>Пока изученных слов нет</p>}
              <Words
                words={completedUserWords?.[0].paginatedResults}
                errorWords={error}
                isLoadingWords={isLoading}
                wordDetail={wordDetail}
                setWordDetail={setWordDetail}
              />
            </div>
            {detail}
          </div>
        </div>
      </section>
    </section>
  )
}

export default CompleteSubpage
