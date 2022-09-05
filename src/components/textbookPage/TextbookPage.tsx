import React, { useEffect, useState } from 'react'
import styles from './TextbookPage.module.scss'
import Words from '../words/Words'
import Detail from './detail/Detail'
import Levels from './levels/Levels'
import { clsx } from 'src/utils/clsx'
import BookSubpage from './bookSubpage/BookSubpage'
import HardSubpage from './hardSubpage/HardSubpage'
import CompleteSubpage from './completeSubpage/CompleteSubpage'
import { Link } from 'react-router-dom'
import { localStorageGet } from '../../utils/localStoradre'
import { userWordsAPI } from '../../services/UsersWordsService'
import { useAppSelector } from '../../hooks/redux'
import { wordsAPI } from '../../services/WordsService'

const TextBookPage: React.FC<any> = () => {
  const local = localStorageGet(['userId'])
  const [isHard, setIsHard] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [wordDetail, setWordDetail] = useState('')
  const { isAuth } = useAppSelector((state) => state.auth)

  const { hardWordsIds, completedWordsIds } = useAppSelector((state) => state.userWords)

  const { data: hardW } = userWordsAPI.useFetchUserWordsQuery(local['userId'])
  const [activeLvl, setActiveLvl] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [hardWords, setHardWords] = useState([])
  const levels = [
    { id: 1, title: 'Easy', descr: 'До 600 слов', lvl: 'A1', bg: '#AFE2FF' },
    { id: 2, title: 'Easy+', descr: 'До 1200 слов', lvl: 'A2', bg: '#AFFFB3' },
    { id: 3, title: 'Middle', descr: 'До 1800 слов', lvl: 'B1', bg: '#FFF2AF' },
    { id: 4, title: 'Middle+', descr: 'До 2400 слов', lvl: 'B2', bg: '#FFCCAF' },
    { id: 5, title: 'Hard', descr: 'До 3000 слов', lvl: 'C1', bg: '#EAAFFF' },
    { id: 6, title: 'Hard+', descr: 'До 3600 слов', lvl: 'C2', bg: '#BAAFFF' },
  ]
  const {
    data: bookWords,
    isLoading: isLoadingWords,
    error: errorWords,
    refetch,
  } = wordsAPI.useFetchWordsQuery({ group: activeLvl - 1, page: activePage - 1 })
  const {
    data: difficultUserWords,
    error: difficultWordsError,
    isLoading: isLoadingHardWords,
  } = userWordsAPI.useFetchAggregatedWordsQuery({ id: local['userId'], wordsDifficult: 'hard' })
  const {
    data: completedUserWords,
    error: errorComplete,
    isLoading: isLoadingComplete,
  } = userWordsAPI.useFetchAggregatedWordsQuery({
    id: local['userId'],
    wordsDifficult: 'completed',
  })

  const [subpage, setSubpage] = useState('book')
  const menuItems = ['Учебник', 'Сложные слова', 'Изученные']
  const menuHandler = (e) => {
    e.preventDefault()
    switch (e.target.innerText) {
      case menuItems[0]:
        console.log('Учебник')
        setSubpage('book')
        break
      case menuItems[1]:
        console.log('Сложные слова')
        setSubpage('hard')
        break
      case menuItems[2]:
        console.log('Изученные')
        setSubpage('complete')
        break
      default:
        break
    }
  }
  useEffect(() => {
    if (subpage == 'book' && bookWords) setWordDetail(bookWords[0].id)
    if (subpage == 'hard' && difficultUserWords)
      setWordDetail(difficultUserWords?.[0].paginatedResults[0]._id)
    if (subpage == 'complete' && completedUserWords)
      setWordDetail(completedUserWords?.[0].paginatedResults[0]._id)
    console.log(difficultUserWords)
  }, [subpage, bookWords, difficultUserWords, completedUserWords])
  useEffect(() => {
    const matchedHard = hardWordsIds.indexOf(wordDetail) > -1
    const matchedCompleted = completedWordsIds.indexOf(wordDetail) > -1
    setIsHard(matchedHard)
    setIsCompleted(matchedCompleted)
  }, [hardWordsIds, wordDetail, completedWordsIds])

  const detail = <Detail id={wordDetail} complete={isCompleted} hard={isHard} subpage={subpage} />
  return (
    <div className={styles.textbook}>
      <section className={styles.textbookInfo}>
        <div className={globalThis.globalStyles.container}>
          <div className={styles.textbookWrapper}>
            <div className={styles.textbookMain}>
              <h1 className={globalThis.globalStyles.pageTitle}>Учебник</h1>
              <p
                className={clsx({
                  [styles.textbookDescr]: true,
                  [globalThis.globalStyles.pageDescr]: true,
                })}
              >
                Здесь ты можешь найти все слова, которые Ингго подготовил для тебя и узнать больше о
                каждом слове.
              </p>
              <ul className={styles.textbookMenu}>
                <li>
                  <button
                    className={clsx({
                      ['_icon-textbook']: true,
                      [styles.textbookSubpage]: true,
                      [styles.subpageActive]: subpage == 'book',
                    })}
                    onClick={menuHandler}
                  >
                    {menuItems[0]}
                  </button>
                </li>
                <li>
                  <button
                    className={clsx({
                      ['_icon-bookmark']: true,
                      [styles.textbookSubpage]: true,
                      [styles.subpageActive]: subpage == 'hard',
                      [styles.subpageDisable]: !isAuth
                    })}
                    onClick={menuHandler}
                  >
                    {menuItems[1]}
                  </button>
                </li>
                <li>
                  <button
                    className={clsx({
                      ['_icon-star']: true,
                      [styles.textbookSubpage]: true,
                      [styles.subpageActive]: subpage == 'complete',
                      [styles.subpageDisable]: !isAuth
                    })}
                    onClick={menuHandler}
                  >
                    {menuItems[2]}
                  </button>
                </li>
              </ul>
            </div>
            <div className={styles.textbookGames}>
              <Link className={styles.textbookGame} to='/games/audiocall' onClick={() => null}>
                <span>Аудио</span>
                <span>Вызов</span>
              </Link>
              <Link className={styles.textbookGame} to='/games/sprint' onClick={() => null}>
                <span>Спринт</span>
              </Link>
              <img src='./assets/svg/enggo-textbook.svg' alt='Поиграй с Enggo' />
            </div>
          </div>
        </div>
      </section>

      {subpage == 'book' && (
        <BookSubpage
          detail={detail}
          bookWords={bookWords}
          activeLvl={activeLvl}
          setActiveLvl={setActiveLvl}
          levels={levels}
          activePage={activePage}
          setActivePage={setActivePage}
          hardWords={hardWords}
          setHardWords={setHardWords}
          wordDetail={wordDetail}
          setWordDetail={setWordDetail}
          isLoadingWords={isLoadingWords}
        />
      )}
      {isAuth && subpage == 'hard' && (
        <HardSubpage
          detail={detail}
          difficultWordsError={difficultWordsError}
          isLoadingHardWords={isLoadingHardWords}
          difficultUserWords={difficultUserWords}
          hardWords={hardWords}
          setHardWords={setHardWords}
          wordDetail={wordDetail}
          setWordDetail={setWordDetail}
        />
      )}
      {isAuth && subpage == 'complete' && (
        <CompleteSubpage
          detail={detail}
          completedUserWords={completedUserWords}
          isLoadingComplete={isLoadingComplete}
          errorComplete={errorComplete}
          hardWords={hardWords}
          setHardWords={setHardWords}
          wordDetail={wordDetail}
          setWordDetail={setWordDetail}
        />
      )}
      {/* <Detail id={wordDetail} complete={isCompleted} hard={isHard} subpage={subpage} />*/}
      <section></section>
    </div>
  )
}

export default TextBookPage
