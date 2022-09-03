import React, { useEffect, useState } from 'react'
import Button from '../../common/button/Button'
import styles from './SprintGame.module.scss'
import { useAppDispatch } from '../../../hooks/redux'
import { sprintSlice } from '../../../store/reducers/sprint/sprintSlice'
import { GameState } from '../../../models/IAudioCall'

const SprintGame: React.FC<any> = ({
  answerVariant,
  wordToGuess,
  selectedAnswer,
  answerHandler,
  score,
}) => {
  const dispatch = useAppDispatch()
  const [timeLeft, setTimeLeft] = useState<number>(30)
  const [startGame, setStartGame] = useState(true)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (startGame) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    }
    if (timeLeft === 1) {
      setStartGame(false)
      dispatch(sprintSlice.actions.setActiveScreen(GameState.GameOver))
    }
    return () => clearTimeout(timer)
  }, [timeLeft])

  console.log(answerVariant)
  return (
    <>
      <div>{timeLeft}</div>
      <div>score:{score}</div>
      {wordToGuess && (
        <div className={styles.audioCallScreen}>
          <div className={styles.currentWord}> {wordToGuess.word}</div>
          <div className={styles.currentWord}> {answerVariant && answerVariant.wordTranslate}</div>

          <div style={{ display: 'flex' }}>
            <Button
              text='НЕ правильно'
              classes={selectedAnswer === false && styles.selectedAnswer}
              onClick={() => answerHandler(false)}
            />
            <Button
              text='правильно'
              classes={selectedAnswer === true && styles.selectedAnswer}
              onClick={() => answerHandler(true)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default SprintGame
