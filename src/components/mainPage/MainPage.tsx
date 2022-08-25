import React, { useEffect, useState } from 'react'
import styles from './MainPage.module.scss'
import Button from '../common/button/Button'
import Loader from '../common/loader/Loader'
import IconButton from '../common/icon-button/IconButton'
import iconTest from '../../assets/test/logo.svg'
import ArrowUp from '../../assets/test/ArrowUp.svg'
import { clsx } from '../../utils/clsx'
import { stlx } from '../../utils/stlx'

const MainPage: React.FC<any> = () => {
  const [color, setColor] = useState('')
  const [value, setValue] = useState(0)

  // const a = useAppSelector(state => state.)
  useEffect(() => {
    console.log('valueeffect', value)
    setValue((prev) => prev + 1)
  }, [])

  const buttonHandler = () => {
    if (color === 'white') setColor('blue')
    else setColor('white')
  }

  console.log('value', value)

  return (
    <div
      className={clsx({
        [styles.mainPageWrapper]: true,
      })}
      style={stlx({
        [`background: ${color};`]: true,
      })}
    >
      value{value}
      <Button classes={styles.exampleButton} text={'buttonForTest'} onClick={buttonHandler} />
      <Loader />
      <IconButton icon={iconTest} height={'height: 12px'} width={'width: 12px'} disabled={false} />
      <IconButton icon={ArrowUp} height={'height: 12px'} width={'width: 12px'} disabled={false} />
    </div>
  )
}

export default MainPage
