import React, { useState } from 'react'
import styles from './MainPage.module.scss'
import Button from '../common/button/Button'
import Loader from '../common/loader/Loader'
import IconButton from '../common/icon-button/IconButton'
import iconTest from '../../assets/test/logo.svg'
import { clsx } from '../../utils/clsx'
import { stlx } from '../../utils/stlx'

const MainPage: React.FC<any> = () => {
  const [color, setColor] = useState('')

  const buttonHandler = () => {
    if (color === 'white') setColor('blue')
    else setColor('white')
    console.log(color)
  }

  return (
    <div
      className={clsx({
        [styles.mainPageWrapper]: true,
      })}
      style={stlx({
        [`background: ${color};`]: true,
      })}
    >
      <Button classes={styles.exampleButton} text={'buttonForTest'} onClick={buttonHandler} />
      <Loader />
      <IconButton icon={iconTest} />
      MainPage
    </div>
  )
}

export default MainPage
