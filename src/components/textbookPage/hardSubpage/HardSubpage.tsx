import React, { useEffect, useState } from 'react'
import Words from 'src/components/words/Words'
import Detail from '../detail/Detail'
import styles from './HardSubpage.module.scss'
import { userWordsAPI } from '../../../services/UsersWordsService'
import { localStorageGet } from '../../../utils/localStoradre'
import { useAppSelector } from 'src/hooks/redux'

const HardSubpage: React.FC<any> = (props) => {
  const [isHard, setIsHard] = useState(false)  
  // const [wordDetail, setWordDetail] = useState('')
  const { wordDetail, setWordDetail } = props;
  const { hardWordsIds } = useAppSelector((state) => state.userWords)
  useEffect(() => {
    const matched = hardWordsIds.indexOf(wordDetail) > -1
    setIsHard(matched)
  }, [hardWordsIds, wordDetail])
  // setWordDetail(hardWordsIds[0])
  // useEffect(() => {
  //  bookWords && setWordDetail(bookWords[0].id)
  // }, [bookWords])
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
      <section className={styles.hard}>
        <div className={globalThis.globalStyles.container}>
          <div className={globalThis.globalStyles.bookWrapper}>
            <div className={globalThis.globalStyles.bookWords}>
              <Words
                words={difficultUserWords?.[0].paginatedResults}
                errorWords={error}
                isLoadingWords={isLoading}
                wordDetail={wordDetail}
                setWordDetail={setWordDetail}
              />
            </div>
            {hardWordsIds.length && (
              <Detail
                id={wordDetail}
                complete={false}
                hard={isHard}
              />)}
          </div>
          
        </div>
        
      </section>
    </section>
  )
}

export default HardSubpage
