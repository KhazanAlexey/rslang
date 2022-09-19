import React, { useEffect, useState } from 'react'
import GamesStartScreen from '../GamesStartScreen'
import styles from './AudioCall.module.scss'
import { GameState, Levels } from '../../../models/IAudioCall'
import AudioCallGame from './AudioCallGame'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { audioCallSlice } from '../../../store/reducers/audioCallSlice'
import { AnswerComponent } from './AnswerComponent'
import { IWord } from '../../../models/IWord'
import { wordsAPI } from '../../../services/WordsService'
import randomInteger from '../../../utils/random'
import { shuffle } from '../../../utils/suffle'
import GamesOverScreen from '../GamesOverScreen'
import { gameSettingsSlice } from 'src/store/reducers/gameSettingsSlice'
import { useAudio } from 'src/hooks/useAudio'

const AudioCall: React.FC = () => {
  const WORD_TO_RELOAD = 3
  const MAX_NUM_PAGE = 29
  const MAX_MOVE = 20
  const MAX_TIME = 60
  const dispatch = useAppDispatch()
  const [level, setLevel] = useState<Levels>()
  const [wordsForGame, setWordsForGame] = useState<IWord[]>([])
  const [wordsBeenGame, setWordsBeenGame] = useState<string[]>([])
  const [pageBeenGame, setPageBeenGame] = useState<number[]>([])
  const [moreWordsForGame, setMoreWordsForGame] = useState<IWord[]>([])
  const [answerVariants, setAnswerVariants] = useState<IWord[]>([])
  const [wordToGuess, setWordToGuess] = useState<IWord | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<IWord | null>(null)
  const { activeScreen } = useAppSelector((state) => state.audioCall)

  const [page, setPage] = useState<number>(0)
  const [futurePage, setFuturePage] = useState<number>(0)
  const [skip, setSkip] = useState(true)
  const { isFromBook, lvlFromBook, pageFromBook } = useAppSelector((state) => state.gameSettings)
  const [isGameBook, setIsGameBook] = useState<boolean>(false)
  const [startGame, setStartGame] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number>(MAX_TIME)
  const [generalIndex, setGeneralIndex] = useState<number>(0)
  const {
    data: words,
    isLoading: isLoadingWords,
    error: errorWords,
    refetch: refetchWords,
  } = wordsAPI.useFetchWordsQuery(
    { group: level, page: page },
    {
      skip,
    },
  )

  const { data: moreWords, isLoading: isLoadingMoreWords, refetch } = wordsAPI.useFetchWordsQuery(
    { group: level, page: futurePage },
    {
      skip,
    },
  )

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (startGame) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    }
    if (timeLeft === 1 && startGame) {
      setStartGame(false)
      dispatch(audioCallSlice.actions.setActiveScreen(GameState.GameOver))
    }
    return () => clearTimeout(timer)
  }, [timeLeft, startGame])

  useEffect(() => {
    if (futurePage) refetch()
  }, [futurePage])

  const errSound = () => {
    const audio = new Audio('../../assets/sound/error-sound.m4a')
    audio.play()
  }
  const successSound = () => {
    const audio = new Audio('../../assets/sound/success-sound.m4a')
    audio.play()
  }

  const answerHandler = (selectedAnswer: IWord) => {
    if (generalIndex === 0) setStartGame(true)
    if (startGame || generalIndex === 0) {
      answerSelectHandler(selectedAnswer)

      if (wordToGuess?.id === selectedAnswer.id) {
        dispatch(audioCallSlice.actions.setCorrectAnswers(selectedAnswer))
        // toggleSuccessSound()
        successSound()
        // setCurrentWordIndex(currentWordIndex + 1)
      } else {
        errSound()
        dispatch(audioCallSlice.actions.setWrongAnswers(selectedAnswer))
      }
      dispatch(audioCallSlice.actions.setActiveScreen(GameState.Answer))
    }
  }

  const answerSelectHandler = (ans: IWord | null) => {
    setSelectedAnswer(ans)
  }

  const skipAnswerHandler = () => {
    if (generalIndex === 0) setStartGame(true)
    if (startGame || generalIndex === 0) {
      if (wordToGuess) {
        dispatch(audioCallSlice.actions.setWrongAnswers(wordToGuess))
      }
      dispatch(audioCallSlice.actions.setActiveScreen(GameState.Answer))
    }
  }

  const nextMove = () => {
    setCurrentWordIndex(currentWordIndex + 1)
    setGeneralIndex(generalIndex + 1)
    answerSelectHandler(null)
    dispatch(audioCallSlice.actions.setActiveScreen(GameState.Game))
  }

  const nextWordHandler = () => {
    if (!startGame && isGameBook) setStartGame(true);
    if (!isGameBook) {
      if (generalIndex === MAX_MOVE - 1) {
        dispatch(audioCallSlice.actions.setActiveScreen(GameState.GameOver))
        setStartGame(false)
      } else {
        nextMove()
      }
    } else {
      nextMove()
    }    
  }

  const startGameHandler = (level: Levels) => {    
    dispatch(audioCallSlice.actions.reset())
    setLevel(level)

    dispatch(audioCallSlice.actions.setActiveScreen(GameState.Game))
    setSkip(false)
  }

  useEffect(() => {
    if (words) setWordsForGame([...words])
  }, [words])

  const randomizer = () => {
    const random = randomInteger(0, MAX_NUM_PAGE)
    if (pageBeenGame.length === MAX_NUM_PAGE + 1) return -1
    if (pageBeenGame.includes(random)) return randomizer()
    setPageBeenGame([...pageBeenGame, random])
    return random
  }


  useEffect(() => {
    if (!isFromBook) {      
      dispatch(audioCallSlice.actions.setActiveScreen(GameState.StartScreen))
      setPageBeenGame([])
      const newPage = randomizer()
      setPage(newPage)
      setFuturePage(newPage ?? [])
    } else {
      dispatch(gameSettingsSlice.actions.toggleIsFromBook(false))
      setIsGameBook(true)
      setPageBeenGame([pageFromBook])
      setPage(pageFromBook)
      setFuturePage(pageFromBook ?? [])
      startGameHandler(lvlFromBook)
    }
  }, [])

  useEffect(() => {
    setWordToGuess(wordsForGame[currentWordIndex])
    if (wordsForGame[currentWordIndex] && wordsForGame[currentWordIndex].id) {
      setWordsBeenGame([...wordsBeenGame, wordsForGame[currentWordIndex].id])
    }
  }, [currentWordIndex, wordsForGame])

  useEffect(() => {
    if (currentWordIndex + WORD_TO_RELOAD === wordsForGame.length) { // Подгрузка слов с запасом по времени
      if (futurePage !== 0 && isGameBook) {
        setFuturePage(futurePage - 1);
      } else if (!isGameBook) {
        const newPage = randomizer()
        if (newPage > -1) {
          setFuturePage(newPage)
        } else {
          dispatch(audioCallSlice.actions.setActiveScreen(GameState.GameOver))
          setIsGameBook(false)
          setStartGame(false)
        }
      }
    } 
    if (currentWordIndex !== 0 && currentWordIndex === wordsForGame.length) {
      if (moreWords && moreWords.length) {
        const newWords = moreWords.filter((word) => !wordsBeenGame.includes(word.id))
        if (newWords && newWords.length) {
          setWordsForGame([...newWords])
          setCurrentWordIndex(0)
          setGeneralIndex(generalIndex + 1)
        } else {
          dispatch(audioCallSlice.actions.setActiveScreen(GameState.GameOver))
          setIsGameBook(false)
          setStartGame(false)
        }
      } else {
        dispatch(audioCallSlice.actions.setActiveScreen(GameState.GameOver))
        setIsGameBook(false)
        setStartGame(false)
      }
    }
  }, [currentWordIndex])

  useEffect(() => {
    if (wordToGuess) {
      const shuffledArray = shuffle([...wordsForGame]).filter((word) => word.id !== wordToGuess.id)
      const wrongAnswers = shuffledArray.slice(0, 4)
      const variantsToAnswer = shuffle([wordToGuess, ...wrongAnswers])
      setAnswerVariants(variantsToAnswer)
    }
  }, [currentWordIndex, wordToGuess])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.repeat) return
      if (event.key === '1') answerHandler(answerVariants[0])
      if (event.key === '2') answerHandler(answerVariants[1])
      if (event.key === '3') answerHandler(answerVariants[2])
      if (event.key === '4') answerHandler(answerVariants[3])
      if (event.key === '5') answerHandler(answerVariants[4])
      if (event.key === ' ') {
        if (activeScreen === GameState.Game) skipAnswerHandler()
        if (activeScreen == GameState.Answer) nextWordHandler()
      }
    }
    window.addEventListener<'keypress'>('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  })

  return (
    <section className={styles.audioCall}>
      <div className={globalThis.globalStyles.container}>
        <h1 className={styles.audioCallTitle}>Аудиовызов</h1>
        <div className={styles.audioCallWrapper}>
          {/* <h1 className={styles.audioCallHeader}>Аудиовызов</h1> */}
          {startGame && (
            <div><p>TIMER: {timeLeft}</p></div>
          )}
          {isLoadingWords && <div className={styles.audioCallLoading}>Загружаем слова..</div>}
          {GameState.StartScreen === activeScreen && (
            <GamesStartScreen
              header='Потренируемся?'
              text='Тренировка "Аудиовызов" улучшает твое восприятие речи на слух. Выбери уровень сложности:'
              setDifficultyLevel={startGameHandler}
            />
          )}
          {GameState.Game === activeScreen && (
            <AudioCallGame
              skipAnswerHandler={skipAnswerHandler}
              answerHandler={answerHandler}
              answerVariants={answerVariants}
              setAnswerVariants={setAnswerVariants}
              selectedAnswer={selectedAnswer}
              wordToGuess={wordToGuess}
              answerSelectHandler={answerSelectHandler}
            />
          )}

          {activeScreen == GameState.Answer && (
            <AnswerComponent
              answerVariants={answerVariants}
              selectedAnswer={selectedAnswer}
              wordToGuess={wordToGuess}
              nextWordHandler={nextWordHandler}
            />
          )}
          {activeScreen == GameState.GameOver && <GamesOverScreen />}
        </div>
      </div>
      <div className={styles.audioCallBg}>
        <img src='../assets/png/bg-audiocall.png' alt='Аудиовызов' />
      </div>
    </section>
  )
}

export default AudioCall
