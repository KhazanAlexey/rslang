import React, { useState } from 'react'
import GamesStartScreen from '../GamesStartScreen'
import styles from './AudioCall.module.scss'
import { GameState, Levels } from '../../../models/IAudioCall'
import AudioCallGame from './AudioCallGame'

const AudioCall: React.FC<any> = () => {
  const [level, setLevel] = useState<Levels>()
  const [activeScreen, setActiveScreen] = useState<GameState>(GameState.StartScreen)

  const startGameHandler = (level: Levels) => {
    setLevel(level)
    setActiveScreen(GameState.Game)
  }

  return (
    <>
      {level}
      <div className={styles.gamesWrapper}>
        <header>Audi call</header>
        {GameState.StartScreen === activeScreen && (
          <GamesStartScreen
            header='Аудиовызов'
            text='Тренировка Аудиовызов улучшает твое восприятие речи на слух.'
            setDifficultyLevel={startGameHandler}
          />
        )}
        {GameState.Game === activeScreen && <AudioCallGame level={level} />}
      </div>
    </>
  )
}

export default AudioCall
