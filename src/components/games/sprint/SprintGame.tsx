import React, { useEffect, useId, useState } from 'react'
import Button from '../../common/button/Button'
import { clsx } from '../../../utils/clsx'
import styles from './AudioCallGame.module.scss'

const SprintGame: React.FC<any> = ({
  answerVariants,
  wordToGuess,
  selectedAnswer,
  answerSelectHandler,
  answerHandler,
  skipAnswerHandler,
}) => {
  const [audioSrc, setAudioSrc] = useState()
  const id = useId()
  console.log(wordToGuess && wordToGuess.audio)

  return (
    <>
      {wordToGuess && (
        <div className={styles.audioCallScreen}>
          <div className={styles.currentWord}> {wordToGuess.word}</div>

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

export default SprintGame
