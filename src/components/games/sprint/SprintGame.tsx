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
  const [timeLeft, setTimeLeft] = useState<number>(20)
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

  return (
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
              classes={selectedAnswer === true && styles.selectedAnswer}
              onClick={() => answerHandler(true)}
            />
            <Button
              text='НЕ правильно'
              classes={selectedAnswer === false && styles.selectedAnswer}
              onClick={() => answerHandler(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default SprintGame
