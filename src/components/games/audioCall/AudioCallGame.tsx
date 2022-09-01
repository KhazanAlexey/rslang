import React, { useId } from 'react'
import Button from '../../common/button/Button'
import { clsx } from '../../../utils/clsx'
import styles from './AudioCallGame.module.scss'
import Player from './PlaySound'

const AudioCallGame: React.FC<any> = ({
  answerVariants,
  wordToGuess,
  selectedAnswer,
  answerSelectHandler,
  answerHandler,
  skipAnswerHandler,
}) => {
  const id = useId()


  return (
    <>
      {wordToGuess && (
        <div className={styles.audioCallScreen}>
          <Player url={`https://rs-lang-193.herokuapp.com/${wordToGuess.audio}`} />
          <div className={styles.currentWord}> {wordToGuess.word}</div>

          <div className={styles.answerOptions}>
            {answerVariants.map((ans, index) => (
              <button
                key={`${id}-${index}`}
                className={clsx({ 
                  [styles.activeVariant]: selectedAnswer?.id == ans.id, 
                  [styles.answerVariant]: true 
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
