import React, { useEffect, useId } from 'react'
import Button from '../common/button/Button'
import styles from './GamesOverScreen.module.scss'
import { useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { userWordsAPI } from 'src/services/UsersWordsService'
import { localStorageGet } from 'src/utils/localStoradre'

const GamesOverScreen: React.FC<any> = ({ game = 'audioCall' }) => {
  const navigate = useNavigate()

  const { wrongAnswers: wrongAnswersSprint, correctAnswers: correctAnswersSprint } = useAppSelector(
    (state) => state.sprint,
  )
  const local = localStorageGet(['userId'])
  const { userWords, userWordsIds } = useAppSelector(state => state.userWords)
  const { wrongAnswers: wrongAnswersAudioCAll, correctAnswers: correctAnswersAudioCall } =
    useAppSelector((state) => state.audioCall)
  const [updateUserWord] = userWordsAPI.useUpdateUserWordMutation()
  const [postUserWord] = userWordsAPI.usePostUserWordMutation()
  let correctAnswers
  let wrongAnswers
  const answersIds = (wrong: any) => {
    return wrong.map(word => word.id)
  }


  const found = (arr1, arr2) => {
    return arr1.some(r => arr2.indexOf(r) >= 0)
  }

  if (game === 'sprint') {
    correctAnswers = correctAnswersSprint
    wrongAnswers = wrongAnswersSprint
  }
  if (game === 'audioCall') {
    correctAnswers = correctAnswersAudioCall
    wrongAnswers = wrongAnswersAudioCAll
  }
  const wrongAnswersID = answersIds(wrongAnswers)
  const correctAnswersID = answersIds(correctAnswers)
  const allAnswerID = [...wrongAnswersID, ...correctAnswersID]

  useEffect(() => {
    if (local) {


      allAnswerID.forEach(answerID => {
        postUserWord({ id: local['userId'], wordId: answerID, optional: { attempts: 1 } })


        // userWordsIds.find(id=>{
        //    if(allAnswerID.indexOf(id)==-1) {
        //      postUserWord({ id: local['userId'], wordId: id, optional: { attempts: 1 } })
        //    } else {
        //      const attempts = answerID?.optional?.attempts || 0
        //      updateUserWord({ id: local['userId'], wordId: id, optional: { attempts: attempts + 1 } })
        //    }
        //
        //  })
      })

    }

  }, [])

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
