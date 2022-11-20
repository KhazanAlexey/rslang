import React, { MouseEventHandler } from 'react'
import { clsx } from '../../../utils/clsx'
import styles from './styles/iconButton.module.scss'

type Props = {
  icon: string | (() => string | JSX.Element)
  onClick?: MouseEventHandler<HTMLElement>
  disabled?: boolean
  enableDefaultHoverClasses?: boolean
  classes?: string
  style?: Record<string, unknown>
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
        onClick={disabled ? undefined : onClick}
        title={title}
      >
        {typeof icon === 'function' && icon()}
      </span>
    </span>
  )
}

export default IconButton
