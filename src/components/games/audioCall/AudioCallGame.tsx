import React, { useEffect, useState } from 'react'
import { wordsAPI } from '../../../services/WordsService'
import randomInteger from '../../../utils/random'
import { IWord } from '../../../models/IWord'
import Button from '../../common/button/Button'
import { shuffle } from 'src/utils/suffle'
import { clsx } from '../../../utils/clsx'
import styles from './AudioCallGame.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { audioCallSlice } from '../../../store/reducers/audioCall/audioCallSlice'
import { GameState } from '../../../models/IAudioCall'

const AudioCallGame: React.FC<any> = ({ level }) => {
  const dispatch = useAppDispatch()
  const [wordsForGame,setWordsForGame]=useState<IWord[]>([])
  const [page, setPage] = useState(0)
  const [additionalPage, setAdditionalPage] = useState(0)
  const [answerVariants, setAnswerVariants] = useState<IWord[]>([])
  const [wordToGuess, setWordToGuess] = useState<IWord | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<IWord | null>(null)
  const { correctAnswers, wrongAnswers, activeScreen } = useAppSelector(state => state.audioCall)
  const {
    data: words,
    isLoading: isLoadingWords,
    error: errorWords,
    refetch,
  } = wordsAPI.useFetchWordsQuery({ group: level, page: page })
  const {
    data: additionalWords,
  } = wordsAPI.useFetchWordsQuery({ group: level, page: additionalPage })

  const answerHandler = (selectedAnswer: IWord) => {
    console.log(selectedAnswer)
    if(currentWordIndex<8){
      answerSelectHandler(selectedAnswer)

      if (wordToGuess?.id === selectedAnswer.id) {
        dispatch(audioCallSlice.actions.setCorrectAnswers(selectedAnswer))
        setCurrentWordIndex(currentWordIndex + 1)
      } else {
        dispatch(audioCallSlice.actions.setWrongAnswers(selectedAnswer))
      }

    }
    }

  // console.log('correctAnswers', correctAnswers)
  // console.log('wrongAnswers', wrongAnswers)

  const answerSelectHandler = (ans: IWord) => {
    setSelectedAnswer(ans)
  }

  const skipAnswerHandler = () => {
    if (wordToGuess) {
      dispatch(audioCallSlice.actions.setWrongAnswers(wordToGuess))
      setCurrentWordIndex(currentWordIndex + 1)
    }
  }

  useEffect(() => {
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
    if(words&&additionalWords){
      setWordsForGame([...words,...additionalWords].slice(0,8))
      console.log('wordsForGame',wordsForGame)
      // setWordToGuess(wordsForGame[currentWordIndex])
    }
    }, [words,additionalWords])
useEffect(()=>{

  setWordToGuess(wordsForGame[currentWordIndex])
},[currentWordIndex,wordsForGame])

  useEffect(() => {
    if (words && wordToGuess && !isLoadingWords) {
      const shuffledArray = shuffle([...wordsForGame]).filter((word) => word.id !== wordToGuess.id)
      const wrongAnswers = shuffledArray.slice(0, 4)
      const variantsToAnswer = shuffle([wordToGuess, ...wrongAnswers])
      setAnswerVariants(variantsToAnswer)
    }
  }, [currentWordIndex, wordToGuess])

  useEffect(() => {
    // if (gameState !== GameState.Question && gameState !== GameState.Answer) return undefined;
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.repeat) return
      if (event.key === '1') answerHandler(answerVariants[0])
      if (event.key === '2') answerHandler(answerVariants[1])
      if (event.key === '3') answerHandler(answerVariants[2])
      if (event.key === '4') answerHandler(answerVariants[3])
      if (event.key === '5') answerHandler(answerVariants[4])
      if (event.key === ' ') {
        if (activeScreen === GameState.Game) skipAnswerHandler()
        // else handleNextClick();
      }
    }
    window.addEventListener<'keypress'>('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  })

  console.log('wrongAnswers',wrongAnswers)
  return <>
    {currentWordIndex}
    {isLoadingWords && <div>loading.....</div>}

    {wordToGuess &&
    <div>
      <div> {wordToGuess.word}</div>
      <div>{answerVariants.map(ans => <button className={clsx({ [styles.activeVariant]: selectedAnswer?.id == ans.id })}
                                              onClick={() => answerSelectHandler(ans)}>{ans.wordTranslate}</button>)}</div>
      {!selectedAnswer
        ? <Button text='Пропустить вопрос' onClick={() => skipAnswerHandler()} />
        : <Button text='Ответ' onClick={() => answerHandler(selectedAnswer)} />
      }
    </div>
    }
  </>
}

export default AudioCallGame
