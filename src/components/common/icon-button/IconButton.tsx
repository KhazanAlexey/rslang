import React from 'react'
import { clsx } from '../../../utils/clsx'
import { stlx } from '../../../utils/stlx'
import styles from './styles/iconButton.module.scss'
import logo from '../../../assets/loader/loader.svg'

type Props = {
  icon: any
  onClick?: (e: MouseEvent) => void
  disabled?: boolean
  enableDefaultHoverClasses?: boolean
  classes?: string
  style?: Object
  width?: string
  height?: string
  title?: string
  active?: boolean
  containerClasses?: string
}

const IconButton = (props: Props) => {
  const {
    icon,
    onClick,
    disabled = false,
    active,
    enableDefaultHoverClasses = true,
    style = '',
    classes = '',
    title,
    width,
    height,
    containerClasses = '',
  } = props

  const isSvgString = typeof icon === 'string' && !!icon
  console.log('isSvg', isSvgString)
  console.log('icon', icon)
  return (
    <span
      className={clsx({
        [styles.iconButtonContainer]: true,
        [containerClasses]: !!containerClasses,
        [styles.active]: !!active,
      })}
    >
      <span
        className={clsx({
          [classes]: !!classes,
          [styles.iconButton]: true,
          [styles.disabled]: disabled,
          [styles.defaultHover]: enableDefaultHoverClasses,
        })}
        style={{
          ...style,
          backgroundImage: `url("${icon}")`,
          width: `${width}`,
          height: `${height}`,
        }}
        role={onClick ? 'button' : undefined}
        // @ts-ignore
        onClick={disabled ? () => null : onClick}
        title={title}
      >
        <span />
        {typeof icon === 'function' && icon()}
      </span>
    </span>
  )
}

export default IconButton
