import React, { useEffect, useState } from 'react'
import styles from './TextbookPage.module.scss'
import Detail from './detail/Detail'
import { clsx } from 'src/utils/clsx'
import BookSubpage from './bookSubpage/BookSubpage'
import HardSubpage from './hardSubpage/HardSubpage'
import CompleteSubpage from './completeSubpage/CompleteSubpage'
import { Link, useNavigate } from 'react-router-dom'
import { localStorageGet } from '../../utils/localStorage'
import { userWordsAPI } from '../../services/UsersWordsService'
import { useAppSelector } from '../../hooks/redux'
import { wordsAPI } from '../../services/WordsService'
import Levels from './levels/Levels'
import { useDispatch } from 'react-redux'
import { gameSettingsSlice } from 'src/store/reducers/gameSettingsSlice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { IWord } from 'src/models/IWord'
import { LvlType } from 'src/models/IGamesSettings'
import { IAggreratedWords } from 'src/models/IUsersWords'

const TextBookPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const local = localStorageGet(['userId'])
  const [isHard, setIsHard] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const [skip, setSkip] = useState(true)

  const [wordDetail, setWordDetail] = useState('')
  const { isAuth } = useAppSelector((state) => state.auth)

  const { hardWordsIds, completedWordsIds } = useAppSelector((state) => state.userWords)
  const { isFromBook } = useAppSelector((state) => state.gameSettings)
  if (isFromBook) dispatch(gameSettingsSlice.actions.toggleIsFromBook(false))

  const [activeLvl, setActiveLvl] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [hardWords, setHardWords] = useState<IWord[]>([])
  const levels: LvlType[] = [
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
  } = wordsAPI.useFetchWordsQuery({ group: activeLvl - 1, page: activePage - 1 })
  const {
    data: difficultUserWords,
    error: difficultWordsError,
    isLoading: isLoadingHardWords,
  } = userWordsAPI.useFetchAggregatedWordsQuery(
    {
      id: local?.userId,
      wordsDifficult: 'hard',
    },
    { skip },
  )
  console.log(difficultUserWords)
  const {
    data: completedUserWords,
    error: errorComplete,
    isLoading: isLoadingComplete,
  } = userWordsAPI.useFetchAggregatedWordsQuery(
    {
      id: local?.userId,
      wordsDifficult: 'completed',
    },
    { skip },
  )

  const [subpage, setSubpage] = useState('book')
  const menuItems = ['Учебник', 'Сложные слова', 'Изученные']
  const menuHandler = (e) => {
    e.preventDefault()
    switch (e.target.innerText) {
      case menuItems[0]:
        setSubpage('book')
        break
      case menuItems[1]:
        setSubpage('hard')
        break
      case menuItems[2]:
        setSubpage('complete')
        break
      default:
        break
    }
  }
  useEffect(() => {
    if (isAuth) setSkip(false)
  }, [isAuth])

  useEffect(() => {
    if (subpage == 'hard' && difficultUserWords)
      // where is paginatedResults from ?!
      setWordDetail(difficultUserWords?.[0].paginatedResults[0]?._id)
    if (subpage == 'complete' && completedUserWords)
      setWordDetail(completedUserWords?.[0].paginatedResults[0]?._id)
  }, [subpage, bookWords, difficultUserWords, completedUserWords])
  useEffect(() => {
    if (subpage == 'book' && bookWords) setWordDetail(bookWords?.[0].id || '')
  }, [subpage, bookWords])
  useEffect(() => {
    const matchedHard = hardWordsIds.indexOf(wordDetail) > -1
    const matchedCompleted = completedWordsIds.indexOf(wordDetail) > -1
    setIsHard(matchedHard)
    setIsCompleted(matchedCompleted)
  }, [hardWordsIds, wordDetail, completedWordsIds])

  useEffect(() => {
    dispatch(gameSettingsSlice.actions.setLvlBook(activeLvl - 1))
  }, [activeLvl])
  useEffect(() => {
    dispatch(gameSettingsSlice.actions.setPageBook(activePage - 1))
  }, [activePage])

  const handleGames = (game: string) => {
    dispatch(gameSettingsSlice.actions.toggleIsFromBook(true))
    if (game === 'sprint') navigate('/games/sprint')
    if (game === 'audiocall') navigate('/games/audiocall')
  }

  // const detail =wordDetail&& <Detail id={wordDetail} complete={isCompleted} hard={isHard} subpage={subpage} />

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
                      [styles.subpageDisable]: !isAuth,
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
                      [styles.subpageDisable]: !isAuth,
                    })}
                    onClick={menuHandler}
                  >
                    {menuItems[2]}
                  </button>
                </li>
              </ul>
            </div>
            <div className={styles.textbookGames}>
              <a className={styles.textbookGame} onClick={() => handleGames('audiocall')}>
                <span className={styles.textbookGameText}>Аудио</span>
                <span className={styles.textbookGameText}>Вызов</span>
                <span className={styles.textbookGameBg}>
                  <img src='./assets/png/bg-audiocall.png' alt='Сыграть в аудиовызов' />
                </span>
              </a>
              <a className={styles.textbookGame} onClick={() => handleGames('sprint')}>
                <span className={styles.textbookGameText}>Спринт</span>
                <span className={styles.textbookGameBg}>
                  <img src='./assets/png/bg-sprint.png' alt='Сыграть в спринт' />
                </span>
              </a>
              <img src='./assets/svg/enggo-textbook.svg' alt='Поиграй с Enggo' />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.subpage}>
        {subpage == 'book' && (
          <section className={styles.subpageLvl}>
            <div className={globalThis.globalStyles.container}>
              <h2 className={globalThis.globalStyles.sectionTitle}>Сложность</h2>
              <Levels
                activeLvl={activeLvl}
                setActiveLvl={setActiveLvl}
                levels={levels}
                activePage={activePage}
                setActivePage={setActivePage}
              />
            </div>
          </section>
        )}
        <section>
          <div className={globalThis.globalStyles.container}>
            {subpage == 'book' && (
              <h2 className={globalThis.globalStyles.sectionTitle}>
                Все слова {levels[activeLvl - 1].title}
              </h2>
            )}
            {isAuth && subpage !== 'book' && (
              <h2 className={globalThis.globalStyles.sectionTitle}>
                {subpage == 'complete' ? 'Изученные слова' : 'Сложные слова'}
              </h2>
            )}
            <div className={styles.subpageWrapper}>
              {subpage == 'book' && (
                <BookSubpage
                  bookWords={bookWords as IWord[]}
                  activeLvl={activeLvl}
                  levels={levels}
                  activePage={activePage}
                  setActivePage={setActivePage}
                  // hardWords={hardWords}
                  // setHardWords={setHardWords}
                  wordDetail={wordDetail}
                  setWordDetail={setWordDetail}
                  isLoadingWords={isLoadingWords}
                />
              )}
              {isAuth && subpage == 'hard' && (
                <HardSubpage
                  difficultWordsError={difficultWordsError as FetchBaseQueryError}
                  isLoadingHardWords={isLoadingHardWords}
                  difficultUserWords={difficultUserWords as IAggreratedWords}
                  // hardWords={hardWords}
                  // setHardWords={setHardWords}
                  wordDetail={wordDetail}
                  setWordDetail={setWordDetail}
                />
              )}
              {isAuth && subpage == 'complete' && (
                <CompleteSubpage
                  completedUserWords={completedUserWords as IAggreratedWords}
                  isLoadingComplete={isLoadingComplete}
                  errorComplete={errorComplete as FetchBaseQueryError}
                  hardWords={hardWords}
                  setHardWords={setHardWords}
                  wordDetail={wordDetail}
                  setWordDetail={setWordDetail}
                />
              )}
              <Detail id={wordDetail} complete={isCompleted} hard={isHard} subpage={subpage} />
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}

export default TextBookPage
