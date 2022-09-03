import React, { useId } from 'react'
import Button from '../common/button/Button'
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
      <div>
        Correct:
        {correctAnswers.map((el, index) => (
          <div key={`${id}-${index}`}>
            {el.word}-{el.wordTranslate}
          </div>
        ))}
      </div>
      <div>
        Wrong:
        {wrongAnswers.map((el, index) => (
          <div key={`${id}-${index}`}>
            {el.word}-{el.wordTranslate}
          </div>
        ))}
      </div>
      <Button text='exit' onClick={exitGameHandler} />
    </>
  )
}

export default GamesOverScreen
