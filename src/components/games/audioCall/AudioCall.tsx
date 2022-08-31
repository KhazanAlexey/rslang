import React, { useState } from 'react'
import GamesStartScreen from '../GamesStartScreen'
import styles from './AudioCall.module.scss'
import { GameState, Levels } from '../../../models/IAudioCall'
import AudioCallGame from './AudioCallGame'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useDispatch } from 'react-redux'
import { audioCallSlice } from '../../../store/reducers/audioCall/audioCallSlice'

const AudioCall: React.FC<any> = () => {
  const dispatch = useAppDispatch()
  const { level, activeScreen } = useAppSelector(state => state.audioCall)

  const startGameHandler = (level: Levels) => {
    dispatch(audioCallSlice.actions.setLevel(level))
    dispatch(audioCallSlice.actions.setActiveScreen(GameState.Game))
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
        {GameState.Answer === activeScreen}
      </div>
    </>
  )
}

export default AudioCall
