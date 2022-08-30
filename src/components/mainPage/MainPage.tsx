import React from 'react'

// import { stlx } from '../../utils/stlx'
import SplashComponent from './mainComponents/SplashComponent'
import LegendComponent from './mainComponents/LegendComponent'
import TeamComponent from './mainComponents/TeamComponent'
// import wave from '../../assets/svg/wave.svg'
// import enggo from '../../assets/svg/enggo.svg'

export const MainPage: React.FC<any> = () => {
  const isAuth = false

  return (
    <>
      <SplashComponent />
      <LegendComponent auth={isAuth} />
      {/* <VideoComponent /> */}
      <TeamComponent />
    </>
  )
}
