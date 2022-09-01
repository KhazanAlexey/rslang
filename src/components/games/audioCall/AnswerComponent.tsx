import React, { useId } from 'react'
import { IWord } from '../../../models/IWord'
import { clsx } from '../../../utils/clsx'
import styles from './AudioCallGame.module.scss'

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
    <>
      {wordToGuess && <div>{wordToGuess.word}</div>}
      {wordToGuess && (
        <img
          src={`https://rs-lang-193.herokuapp.com/${wordToGuess.image}`}
          alt={wordToGuess.word}
        />
      )}
      <div>
        {answerVariants.map((ans, index) => (
          <button
            key={`${id}-${index}`}
            className={clsx({
              [styles.activeVariant]: selectedAnswer?.id == ans.id,
              [styles.correctVariant]: wordToGuess?.id == ans.id,
            })}
          >
            {ans.wordTranslate}
          </button>
        ))}
      </div>
      <button onClick={nextWordHandler}>NExT question</button>
    </>
  )
}
