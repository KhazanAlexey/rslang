import React, { useId } from 'react'
import Button from '../common/button/Button'
import styles from './GamesOverScreen.module.scss'
import { useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'

const GamesOverScreen: React.FC<any> = ({ game = 'audioCall' }) => {
  const navigate = useNavigate()

  const { wrongAnswers: wrongAnswersSprint, correctAnswers: correctAnswersSprint } = useAppSelector(
    (state) => state.sprint,
  )
  const { wrongAnswers: wrongAnswersAudioCAll, correctAnswers: correctAnswersAudioCall } =
    useAppSelector((state) => state.audioCall)
  let correctAnswers
  let wrongAnswers

  if (game === 'sprint') {
    correctAnswers = correctAnswersSprint
    wrongAnswers = wrongAnswersSprint
  }
  if (game === 'audioCall') {
    correctAnswers = correctAnswersAudioCall
    wrongAnswers = wrongAnswersAudioCAll
  }

  const id = useId()
  const exitGameHandler = () => {
    navigate('/games')
  }
  return (
    <>
      <div className={styles.overGroup}>
        <h3 className={styles.overTitle}>Правильные ответы:</h3>
        <ol className={styles.overList}>
          {correctAnswers.map((el, index) => (
          <li className={styles.overItem} key={`${id}-${index}`}>
            {el.word} - {el.wordTranslate}
          </li>
        ))}
        </ol>
      </div>
      <div className={styles.overGroup}>
        <h3 className={styles.overTitle}>Ошибки:</h3>
        <ol className={styles.overList}>
          {wrongAnswers.map((el, index) => (
          <li className={styles.overItem} key={`${id}-${index}`}>
            {el.word} - {el.wordTranslate}
          </li>
        ))}
        </ol>
      </div>
      <Button text='Выход' onClick={exitGameHandler} />
    </>
  )
}

export default GamesOverScreen
