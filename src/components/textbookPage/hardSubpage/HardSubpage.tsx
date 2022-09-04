import React, { useState } from 'react'
import Words from 'src/components/words/Words'
import Detail from '../detail/Detail'
import styles from './HardSubpage.module.scss'
import { userWordsAPI } from '../../../services/UsersWordsService'
import { localStorageGet } from '../../../utils/localStoradre'

const HardSubpage: React.FC<any> = (props) => {
  const { hardWords, setHardWords } = props
  const [wordDetail, setWordDetail] = useState('')
  const local = localStorageGet(['userId'])
  const {
    data: difficultUserWords,
    error,
    isLoading,
  } = userWordsAPI.useFetchAggregatedWordsQuery({ id: local['userId'], wordsDifficult: 'hard' })
  console.log('difficultUserWords', difficultUserWords)
  return (
    <section className=''>
      <section>
        <div className={globalThis.globalStyles.container}>
          <h2 className={globalThis.globalStyles.sectionTitle}>Сложные слова</h2>
        </div>
      </section>
      <section className=''>
        <div className={globalThis.globalStyles.container}>
          <Detail
            id={wordDetail}
            complete={false}
            hard={false}
            hardWords={hardWords}
            setHardWords={setHardWords}
          />
        </div>
        <Words
          words={difficultUserWords?.[0].paginatedResults}
          errorWords={error}
          isLoadingWords={isLoading}
          wordDetail={wordDetail}
          setWordDetail={setWordDetail}
        />
      </section>
    </section>
  )
}

export default HardSubpage
