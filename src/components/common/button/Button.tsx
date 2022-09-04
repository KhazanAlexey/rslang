import React from 'react'
import { useNavigate } from 'react-router-dom'
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
  href?:string
}

const ButtonCustom = (props: Props) => {
  const {
    onClick,
    disabled = false,
    enableDefaultHoverClasses = true,
    style = '',
    classes = '',
    title,
    text // , href
  } = props
  
 // const navigate = useNavigate()

  return (
    <button {...{...props, ...{
      className: clsx({
        [classes]: !!classes,
        [styles.button]: true,
        [styles.disabled]: disabled,
        [styles.defaultHover]: enableDefaultHoverClasses
      }),
      style:stlx({
        [style]: !!style
      }),
      onClick, // :() => href ? navigate(href) : onClick ? onClick : 'void',
      title,
      disabled
    }}}
    >
      {text}
    </button>
  )
}

export default ButtonCustom
