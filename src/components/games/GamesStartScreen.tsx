import React, { useId, useState } from 'react'
import styles from './GamesStartScreen.module.scss'
import Button from '../common/button/Button'
import { clsx } from '../../utils/clsx'
import { Levels } from 'src/models/IAudioCall'

const GamesStartScreen: React.FC<any> = ({ header, text, setDifficultyLevel }) => {
  const [level, setLevel] = useState<Levels | null>(null)
  const id = useId()
  const wordsGroup = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

  return (
    <>
      <div>
        <header>{header}</header>
        <p>{text}</p>
        <div className={styles.startScreenWrapper}>
          {wordsGroup.map((word, index) => (
            <div
              key={`${id}-${index}`}
              className={clsx({ [styles.activeLevel]: index === level })}
              onClick={() => {
                setLevel(Levels[word])
              }}
            >
              {word}
            </div>
          ))}
        </div>
        <Button text='start' disabled={!level} onClick={() => setDifficultyLevel(level)} />
      </div>
    </>
  )
}

export default GamesStartScreen
