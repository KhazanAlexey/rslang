import React, { useId } from 'react'
import Button from '../common/button/Button'
import { useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'

const GamesOverScreen: React.FC<any> = () => {
  const { wrongAnswers, correctAnswers } = useAppSelector((state) => state.audioCall)
  const navigate = useNavigate()
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
