import React from 'react'

// import { stlx } from '../../utils/stlx'
import SplashComponent from './mainComponents/Splash/SplashComponent'
import LegendComponent from './mainComponents/Legend/LegendComponent'
import TeamComponent from './mainComponents/Team/TeamComponent'
import EnggoComponent from './mainComponents/Enggo/EnggoComponent'
import FriendsComponent from './mainComponents/Friends/FriendsComponent'
// import wave from '../../assets/svg/wave.svg'
// import enggo from '../../assets/svg/enggo.svg'

export const MainPage: React.FC<any> = () => {
  return (
    <>
      <SplashComponent />
      <LegendComponent />
      <EnggoComponent />
      <FriendsComponent />
      <TeamComponent />
    </>
  )
}
