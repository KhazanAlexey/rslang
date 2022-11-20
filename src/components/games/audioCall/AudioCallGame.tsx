import React, { useId } from 'react'
import Button from '../../common/button/Button'
import { clsx } from '../../../utils/clsx'
import styles from './AudioCallGame.module.scss'
import Player from './PlaySound'
import { IWord } from 'src/models/IWord'

type PropsType = {
  answerVariants: IWord[]
  wordToGuess: IWord | null
  selectedAnswer: IWord | null
  answerSelectHandler: (ans: IWord | null) => void
  answerHandler: (ans: IWord) => void
  skipAnswerHandler: () => void
  setAnswerVariants: (ans: IWord[]) => void
}

const AudioCallGame = ({
  answerVariants,
  wordToGuess,
  selectedAnswer,
  answerSelectHandler,
  answerHandler,
  skipAnswerHandler,
}: PropsType) => {
  const id = useId()

  return (
    <>
      {wordToGuess && (
        <div className={styles.audioCallScreen}>
          <div className={styles.audioCallScreenWrap}>
            <Player url={`https://rs-lang-193.herokuapp.com/${wordToGuess.audio}`} />
            <div className={styles.currentWord}> {wordToGuess.word}</div>
          </div>

          <div className={styles.answerOptions}>
            {answerVariants.map((ans, index) => (
              <button
                key={`${id}-${index}`}
                className={clsx({
                  [styles.activeVariant]: selectedAnswer?.id == ans.id,
                  [styles.answerVariant]: true,
                })}
                onClick={() => answerSelectHandler(ans)}
              >
                {ans.wordTranslate}
              </button>
            ))}
          </div>

          {!selectedAnswer ? (
            <Button text='Пропустить вопрос' onClick={() => skipAnswerHandler()} />
          ) : (
            <Button text='Ответ' onClick={() => answerHandler(selectedAnswer)} />
          )}
        </div>
      )}
    </>
  )
}

export default AudioCallGame
