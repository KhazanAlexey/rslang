import React, { useEffect, useState } from 'react'
import styles from './MainPage.module.scss'

// import { stlx } from '../../utils/stlx'
import { Link } from 'react-router-dom'
import { SplashComponent } from './mainComponents/SplashComponent';
import { LegendComponent } from './mainComponents/LegendComponent';
import { VideoComponent } from './mainComponents/VideoComponent';
// import wave from '../../assets/svg/wave.svg'
// import enggo from '../../assets/svg/enggo.svg'

const MainPage: React.FC<any> = () => {
  const isAuth = false;

  return (
    <>
    <SplashComponent auth={isAuth} />
    <LegendComponent  auth={isAuth} />
    <VideoComponent />
    </>
  )
}

export default MainPage
