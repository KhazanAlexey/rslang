import React, { useEffect, useState } from 'react'
import GamesStartScreen from '../GamesStartScreen'
import styles from './Sprint.module.scss'
import { GameState, Levels } from '../../../models/IAudioCall'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { audioCallSlice } from '../../../store/reducers/audioCall/audioCallSlice'
import { IWord } from '../../../models/IWord'
import { wordsAPI } from '../../../services/WordsService'
import randomInteger from '../../../utils/random'
import { shuffle } from '../../../utils/suffle'
import GamesOverScreen from '../GamesOverScreen'
import SprintGame from './SprintGame'

const Sprint: React.FC<any> = () => {
  const dispatch = useAppDispatch()
  const [level, setLevel] = useState<Levels>()
  const [wordsForGame, setWordsForGame] = useState<IWord[]>([])
  const [answerVariants, setAnswerVariants] = useState<IWord[]>([])
  const [wordToGuess, setWordToGuess] = useState<IWord | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<IWord | null>(null)
  const { activeScreen } = useAppSelector((state) => state.audioCall)

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

  const answerHandler = (selectedAnswer: IWord) => {
    console.log(selectedAnswer)

    answerSelectHandler(selectedAnswer)

    if (wordToGuess?.id === selectedAnswer.id) {
      dispatch(audioCallSlice.actions.setCorrectAnswers(selectedAnswer))
      // setCurrentWordIndex(currentWordIndex + 1)
    } else {
      dispatch(audioCallSlice.actions.setWrongAnswers(selectedAnswer))
    }
    dispatch(audioCallSlice.actions.setActiveScreen(GameState.Answer))
  }

  const answerSelectHandler = (ans: IWord | null) => {
    setSelectedAnswer(ans)
  }

  const skipAnswerHandler = () => {
    if (wordToGuess) {
      dispatch(audioCallSlice.actions.setWrongAnswers(wordToGuess))
    }
    dispatch(audioCallSlice.actions.setActiveScreen(GameState.Answer))
  }

  const nextWordHandler = () => {
    if (currentWordIndex == 7) {
      dispatch(audioCallSlice.actions.setActiveScreen(GameState.GameOver))
    } else {
      setCurrentWordIndex(currentWordIndex + 1)
      answerSelectHandler(null)
      dispatch(audioCallSlice.actions.setActiveScreen(GameState.Game))
    }
  }

  const startGameHandler = (level: Levels) => {
    console.log('level', level)
    setLevel(level)

    dispatch(audioCallSlice.actions.setActiveScreen(GameState.Game))
    setSkip(false)
  }

  useEffect(() => {
    if (words && additionalWords) {
      setWordsForGame([...words, ...additionalWords].slice(0, 8))
    }
  }, [words, additionalWords])

  useEffect(() => {
    dispatch(audioCallSlice.actions.setActiveScreen(GameState.StartScreen))
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
        <div className={styles.audioCallWrapper}>
          <h1 className={styles.audioCallHeader}>Audio call</h1>
          {isLoadingWords && <div className={styles.loading}>loading.....</div>}
          {GameState.StartScreen === activeScreen && (
            <GamesStartScreen
              header='Аудиовызов'
              text='Тренировка Аудиовызов улучшает твое восприятие речи на слух.'
              setDifficultyLevel={startGameHandler}
            />
          )}
          {GameState.Game === activeScreen && (
            <SprintGame
              skipAnswerHandler={skipAnswerHandler}
              answerHandler={answerHandler}
              answerVariants={answerVariants}
              setAnswerVariants={setAnswerVariants}
              selectedAnswer={selectedAnswer}
              wordToGuess={wordToGuess}
              answerSelectHandler={answerSelectHandler}
            />
          )}

          {activeScreen == GameState.GameOver && <GamesOverScreen />}
        </div>
      </div>
    </section>
  )
}

export default Sprint
