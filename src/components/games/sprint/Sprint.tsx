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

const Sprint: React.FC<any> = () => {
  const dispatch = useAppDispatch()
  const [score, setScore] = useState<number>(0)
  const [level, setLevel] = useState<Levels>()
  const [wordsForGame, setWordsForGame] = useState<IWord[]>([])
  const [answerVariant, setAnswerVariant] = useState<IWord>()

  const [wordToGuess, setWordToGuess] = useState<IWord | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>()
  const { activeScreen } = useAppSelector((state) => state.sprint)

  const [page, setPage] = useState<number>()
  const [additionalPage, setAdditionalPage] = useState<number>()
  const [skip, setSkip] = useState(true)
  const {
    data: words,
    isLoading: isLoadingWords,
    error: errorWords,
    refetch,
  } = wordsAPI.useFetchWordsQuery(
    { group: level, page: page },
    {
      skip,
    },
  )

  const { data: additionalWords } = wordsAPI.useFetchWordsQuery(
    { group: level, page: additionalPage },
    {
      skip,
    },
  )

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
        // toggleSuccessSound()
        successSound()
        wordToGuess && dispatch(sprintSlice.actions.setCorrectAnswers(wordToGuess))
        setScore(score + 10)
      } else {
        // toggleErrorSound()
        errSound()
        wordToGuess && dispatch(sprintSlice.actions.setWrongAnswers(wordToGuess))
      }
    }
    if (!isRight) {
      if (wordToGuess?.id === answerVariant?.id) {
        errSound()
        // toggleErrorSound()
        wordToGuess && dispatch(sprintSlice.actions.setWrongAnswers(wordToGuess))
      } else {
        // toggleSuccessSound()
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
    setLevel(level)
    dispatch(sprintSlice.actions.setActiveScreen(GameState.Game))
    setSkip(false)
  }

  useEffect(() => {
    if (words && additionalWords) {
      setWordsForGame([...words, ...additionalWords])
    }
  }, [words, additionalWords])

  useEffect(() => {
    dispatch(sprintSlice.actions.setActiveScreen(GameState.StartScreen))
    let random = randomInteger(0, 21)
    let randomAdd = randomInteger(0, 21)

    function randomizer() {
      random = randomInteger(0, 21)
      randomAdd = randomInteger(0, 21)
    }

    if (random === randomAdd) randomizer()

    setPage(randomInteger(0, 21))
    setAdditionalPage(randomInteger(0, 21))
  }, [])

  useEffect(() => {
    setWordToGuess(wordsForGame[currentWordIndex])
  }, [currentWordIndex, wordsForGame])

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
      if (event.key === 'ArrowLeft') answerHandler(false)
      if (event.key === 'ArrowRight') answerHandler(true)
    }
    window.addEventListener<'keyup'>('keyup', handleKeyPress)
    return () => window.removeEventListener('keyup', handleKeyPress)
  })
  console.log(answerVariant)
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
