import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage } from './components/mainPage/MainPage'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import GamesPage from './components/gamesPage/GamesPage'
import styles from './App.module.scss'
import TextBookPage from './components/textbookPage/TextbookPage'
import StatPage from './components/statPage/StatPage'
import AudioCall from './components/games/audioCall/AudioCall'
import Sprint from './components/games/sprint/Sprint'

globalThis.globalStyles = styles

export function App() {  
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <Header />

        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/games' element={<GamesPage />} />
          <Route path='/games/audiocall' element={<AudioCall />} />
          <Route path='/games/sprint' element={<Sprint />} />
          <Route path='/textbook' element={<TextBookPage />} />
          <Route path='/stat' element={<StatPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}
