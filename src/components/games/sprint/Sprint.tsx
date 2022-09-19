import React, { useEffect, useState } from 'react'
import GamesStartScreen from '../GamesStartScreen'
import styles from './Sprint.module.scss'
import { GameState, Levels } from '../../../models/IAudioCall'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { IWord } from '../../../models/IWord'
import { wordsAPI } from '../../../services/WordsService'
import randomInteger from '../../../utils/random'
import { shuffle } from '../../../utils/suffle'
import GamesOverScreen from '../GamesOverScreen'
import SprintGame from './SprintGame'
import { sprintSlice } from '../../../store/reducers/sprintSlice'
import { useAudio } from 'src/hooks/useAudio'
import { gameSettingsSlice } from 'src/store/reducers/gameSettingsSlice'

const Sprint: React.FC<any> = () => {
  const WORD_TO_RELOAD = 7;

  const dispatch = useAppDispatch()

  const [score, setScore] = useState<number>(0)
  const [level, setLevel] = useState<Levels>()
  const [wordsForGame, setWordsForGame] = useState<IWord[]>([])
  const [wordsBeenGame, setWordsBeenGame] = useState<string[]>([])
  const [moreWordsForGame, setMoreWordsForGame] = useState<IWord[]>([])
  const [answerVariant, setAnswerVariant] = useState<IWord>()

  const [wordToGuess, setWordToGuess] = useState<IWord | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>()
  const { activeScreen } = useAppSelector((state) => state.sprint)

  const [page, setPage] = useState<number>(0)
  const [futurePage, setFuturePage] = useState<number>(0)
  const [additionalPage, setAdditionalPage] = useState<number>()
  const [skip, setSkip] = useState(true)
  const { isFromBook, lvlFromBook, pageFromBook } = useAppSelector((state) => state.gameSettings)
  const {
    data: words,
    isLoading: isLoadingWords,
    error: errorWords
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
    if (futurePage) refetch()
  }, [futurePage])


  // const [playingErrorSound, toggleErrorSound] = useAudio('../../assets/sound/error-sound.m4a')
  // const [playingSuccessSound, toggleSuccessSound] = useAudio('../../assets/sound/success-sound.m4a')
  const errSound = () => {
    const audio = new Audio('../../assets/sound/error-sound.m4a')
    audio.play()
  }
  const successSound = () => {
    const audio = new Audio('../../assets/sound/success-sound.m4a')
    audio.play()
  }

  const answerHandler = (isRight: boolean) => {
    setSelectedAnswer(isRight)
    if (isRight) {
      if (wordToGuess?.id === answerVariant?.id) {
        successSound()
        wordToGuess && dispatch(sprintSlice.actions.setCorrectAnswers(wordToGuess))
        setScore(score + 10)
      } else {
        errSound()
        wordToGuess && dispatch(sprintSlice.actions.setWrongAnswers(wordToGuess))
      }
    }
    if (!isRight) {
      if (wordToGuess?.id === answerVariant?.id) {
        errSound()
        wordToGuess && dispatch(sprintSlice.actions.setWrongAnswers(wordToGuess))
      } else {
        successSound()
        wordToGuess && dispatch(sprintSlice.actions.setCorrectAnswers(wordToGuess))
        setScore(score + 10)
      }
    }
    setCurrentWordIndex(currentWordIndex + 1)
  }
  useEffect(() => {
    const tim = setTimeout(() => {
      setSelectedAnswer(null)
    }, 300)
    return () => clearTimeout(tim)
  }, [selectedAnswer])

  const startGameHandler = (level: Levels) => {
    dispatch(sprintSlice.actions.reset())
    setLevel(level)
    dispatch(sprintSlice.actions.setActiveScreen(GameState.Game))
    setSkip(false)
  }

  useEffect(() => {
    if (words) setWordsForGame([...words])
  }, [words])

  const randomizerTwoValues = (min: number, max: number): number[] => {
    const random = randomInteger(min, max)
    const randomAdd = randomInteger(min, max)
    if (random === randomAdd) return randomizerTwoValues(min, max)
    return [random, randomAdd]
  }

  useEffect(() => {
    if (!isFromBook) {
      dispatch(sprintSlice.actions.setActiveScreen(GameState.StartScreen))
      const [ page ] = randomizerTwoValues(0, 29)
      setPage(page)
      setFuturePage(page ?? [])
    } else {
      dispatch(gameSettingsSlice.actions.toggleIsFromBook(false));
      setPage(pageFromBook)
      setFuturePage(pageFromBook ?? [])
      startGameHandler(lvlFromBook);
    }
    
  }, [])

  useEffect(() => {
    setWordToGuess(wordsForGame[currentWordIndex])
    if (wordsForGame[currentWordIndex] && wordsForGame[currentWordIndex].id) {
      setWordsBeenGame([...wordsBeenGame, wordsForGame[currentWordIndex].id])
    }
  }, [currentWordIndex, wordsForGame])

  useEffect(() => {
    if (currentWordIndex + WORD_TO_RELOAD === wordsForGame.length) {
      if (futurePage !== 0) {
        setFuturePage(futurePage - 1);
      }
    } 
    if (currentWordIndex !== 0 && currentWordIndex === wordsForGame.length) {
      if (moreWords && moreWords.length) {
        console.log(moreWords)
         const newWords = moreWords.filter((word) => !wordsBeenGame.includes(word.id))
         if (newWords && newWords.length) {
          setWordsForGame([...newWords])
          setCurrentWordIndex(0)
         } else {
          dispatch(sprintSlice.actions.setActiveScreen(GameState.GameOver))
         }
      } else {
        dispatch(sprintSlice.actions.setActiveScreen(GameState.GameOver))
      }
    }
  }, [currentWordIndex])

  useEffect(() => {
    if (wordToGuess) {
      const shuffledArray = shuffle([...wordsForGame]).filter((word) => word.id !== wordToGuess.id)
      const wrongAnswers = shuffledArray.slice(0, 4)
      const variantsToAnswer = shuffle([wordToGuess, ...wrongAnswers])
      setAnswerVariant(variantsToAnswer[0])
    }
  }, [currentWordIndex, wordToGuess])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.repeat) return
      if (event.key === 'ArrowLeft') answerHandler(true)
      if (event.key === 'ArrowRight') answerHandler(false)
    }
    window.addEventListener<'keyup'>('keyup', handleKeyPress)
    return () => window.removeEventListener('keyup', handleKeyPress)
  })
  return (
    <section className={styles.sprint}>
      <div className={globalThis.globalStyles.container}>
        <h1 className={styles.sprintTitle}>Спринт</h1>
        <div className={styles.sprintWrapper}>
          {isLoadingWords && <div className={styles.loading}>loading...</div>}
          {GameState.StartScreen === activeScreen && (
            <GamesStartScreen
              header='Кто быстрее?'
              text='Тренировка на скорость Спринт отлично помогает закрепить слова! Выбери уровень:'
              setDifficultyLevel={startGameHandler}
            />
          )}
          {GameState.Game === activeScreen && (
            <SprintGame
              score={score}
              answerHandler={answerHandler}
              answerVariant={answerVariant}
              selectedAnswer={selectedAnswer}
              wordToGuess={wordToGuess}
            />
          )}

          {activeScreen == GameState.GameOver && <GamesOverScreen game={'sprint'} />}
        </div>
      </div>
      <div className={styles.sprintBg}>
        <img src='../assets/png/bg-sprint.png' alt='Спринт' />
      </div>
    </section>
  )
}

export default Sprint
