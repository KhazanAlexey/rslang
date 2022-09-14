import React from 'react'
import Words from 'src/components/words/Words'
import styles from './HardSubpage.module.scss'

const HardSubpage: React.FC<any> = (props) => {
  const {
    wordDetail,
    setWordDetail,
    difficultUserWords,
    isLoadingHardWords,
    difficultWordsError: error,
  } = props

  const isEmpty = !difficultUserWords?.[0].paginatedResults.find(
    (x) => x.userWord.difficulty == 'hard',
  )
  return (
    <section className=''>
      <section>
        <div className={globalThis.globalStyles.container}>
          <h2 className={globalThis.globalStyles.sectionTitle}>Сложные слова</h2>
        </div>
      </section>
      <section className={styles.hard}>
        <div className={globalThis.globalStyles.container}>
          <div className={globalThis.globalStyles.bookWrapper}>
            <div className={globalThis.globalStyles.bookWords}>
              {isEmpty && <p>Пока сложных слов нет</p>}
              <Words
                words={difficultUserWords?.[0].paginatedResults}
                errorWords={error}
                isLoadingWords={isLoadingHardWords}
                wordDetail={wordDetail}
                setWordDetail={setWordDetail}
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default HardSubpage
