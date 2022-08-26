import React from 'react'
import { clsx } from '../../../utils/clsx'
import { stlx } from '../../../utils/stlx'
import styles from './styles/button.module.scss'

type Props = {
  text?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  enableDefaultHoverClasses?: boolean
  classes?: string
  style?: string
  title?: string
}

const ButtonCustom = (props: Props) => {
  const {
    onClick,
    disabled = false,
    enableDefaultHoverClasses = true,
    style = '',
    classes = '',
    title,
    text,
  } = props

  return (
    <button
      className={clsx({
        [classes]: !!classes,
        [styles.button]: true,
        [styles.disabled]: disabled,
        [styles.defaultHover]: enableDefaultHoverClasses,
      })}
      style={stlx({
        [style]: !!style,
      })}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default ButtonCustom
