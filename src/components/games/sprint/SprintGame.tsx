import React, { useEffect, useState } from 'react'
import Button from '../../common/button/Button'
import styles from './SprintGame.module.scss'
import { useAppDispatch } from '../../../hooks/redux'
import { GameState } from '../../../models/IAudioCall'
import { sprintSlice } from '../../../store/reducers/sprintSlice'
import { IWord } from 'src/models/IWord'

type PropsType = {
  answerVariant: IWord | undefined
  wordToGuess: IWord | null
  selectedAnswer: null | undefined | boolean
  answerHandler: (_: boolean) => void
  score: number
}

const SprintGame: React.FC<PropsType> = ({
  answerVariant,
  wordToGuess,
  selectedAnswer,
  answerHandler,
  score,
}) => {
  const dispatch = useAppDispatch()
  const [timeLeft, setTimeLeft] = useState<number>(15)
  const [startGame, setStartGame] = useState(true)
  const [freeze, setFreeze] = useState(true);
  const [isLoadingWords, setIsLoadingWords] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (startGame && !freeze) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    }
    if (timeLeft === 1) {
      setStartGame(false)
      dispatch(sprintSlice.actions.setActiveScreen(GameState.GameOver))
    }
    return () => clearTimeout(timer)
  }, [timeLeft, freeze])

  useEffect(() => {
    if (!isLoadingWords) setIsLoadingWords(true);
  }, [wordToGuess])

  const handleFreeze = () => {
    setFreeze(false);
  }


  return (
    <>
      {!freeze && (
      <>
        <p className={styles.timer}>Осталось {timeLeft} сек.</p>
        <p className={styles.score}>Получено очков: {score}</p>
        {wordToGuess && (
            <div className={styles.audioCallScreen}>
              <div className={styles.currentWord}> {wordToGuess.word}</div>
              <div className={styles.currentWord}> {answerVariant && answerVariant.wordTranslate}</div>

              <div className={styles.answerList}>
                <Button
                  text='Правильно'
                  classes={selectedAnswer === true && styles.selectedAnswer || 'false'}
                  onClick={() => answerHandler(true)}
                />
                <Button
                  text='НЕ правильно'
                  classes={selectedAnswer === false && styles.selectedAnswer || 'false'}
                  onClick={() => answerHandler(false)}
                />
              </div>
            </div>
          )}
      </>
      )}
      {freeze && (
        <div className={styles.freeze}>
          <p className={styles.freezeText}>Ингго уже {!isLoadingWords ? 'готовит слова для тебя, подожди немного...' : 'подготовил слова! Are you ready?'}</p>
          {isLoadingWords && (<Button text='Поехали!' classes={styles.freezeReady} onClick={handleFreeze} />)}
        </div>
      )}
    </>
  )
}

export default SprintGame
