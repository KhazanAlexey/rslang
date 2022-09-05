import React, { useId, useState } from 'react'
import styles from './GamesStartScreen.module.scss'
import Button from '../common/button/Button'
import { clsx } from '../../utils/clsx'
import { Levels } from 'src/models/IAudioCall'

type PropsType = {
  header: string
  text: string
  setDifficultyLevel: (_: Levels) => void
}

const GamesStartScreen: React.FC<PropsType> = ({ header, text, setDifficultyLevel }) => {
  const [level, setLevel] = useState<Levels>(0)
  const id = useId()
  const wordsGroup = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

  return (
    <>
      <div className={styles.gameStart}>
        <h2 className={styles.gameStartHeader}>{header}</h2>
        <p className={styles.gameStartDesc}>{text}</p>
        <div className={styles.gameStartLevels}>
          {wordsGroup.map((word, index) => (
            <div
              key={`${id}-${index}`}
              className={clsx({ [styles.activeLevel]: index === level, [styles.level]: true })}
              onClick={() => {
                setLevel(Levels[word])
              }}
            >
              {word}
            </div>
          ))}
        </div>
        <Button text='start' onClick={() => setDifficultyLevel(level)} />
      </div>
    </>
  )
}

export default GamesStartScreen
