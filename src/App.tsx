import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import LoginPage from './components/auth/LoginPage'
import Savanna from './components/games/savanna/Savanna'
import MainPage from './components/mainPage/MainPage'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import GamesPage from './components/gamesPage/GamesPage'
import styles from './App.module.scss'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <section className={styles.contentWrapper}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/games' element={<GamesPage />} />
          <Route path='/games/savanna' element={<Savanna />} />
        </Routes>
      </section>

      <Footer />
    </BrowserRouter>
  )
}

export default App
