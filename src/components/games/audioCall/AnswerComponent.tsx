import React, { useId } from 'react'
import { IWord } from '../../../models/IWord'
import { clsx } from '../../../utils/clsx'
import styles from './AudioCallGame.module.scss'
import Button from '../../common/button/Button'

type Props = {
  answerVariants: IWord[]
  selectedAnswer: IWord | null
  wordToGuess: IWord | null
  nextWordHandler: () => void
}

export const AnswerComponent: React.FC<Props> = ({
  nextWordHandler,
  answerVariants,
  selectedAnswer,
  wordToGuess,
}) => {
  const id = useId()

  return (
    <div className={styles.answer}>
      {wordToGuess && <div className={styles.currentWord}> {wordToGuess.word}</div>}
      {wordToGuess && (
        <div className={styles.answerImage}>
          <img
            src={`https://rs-lang-193.herokuapp.com/${wordToGuess.image}`}
            alt={wordToGuess.word}
          />
        </div>
      )}
      <div className={styles.answerOptions}>
        {answerVariants.map((ans, index) => (
          <button
            key={`${id}-${index}`}
            className={clsx({
              [styles.activeVariant]: selectedAnswer?.id == ans.id,
              [styles.correctVariant]: wordToGuess?.id == ans.id,
              [styles.answerVariant]: true,
            })}
          >
            {ans.wordTranslate}
          </button>
        ))}
      </div>
      <Button text='Следующее слово' onClick={nextWordHandler}></Button>
    </div>
  )
}
