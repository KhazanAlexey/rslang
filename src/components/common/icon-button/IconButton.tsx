import React from 'react'
import { clsx } from '../../../utils/clsx'
import { stlx } from '../../../utils/stlx'
import styles from './styles/iconButton.module.scss'

type Props = {
  icon: any
  onClick?: (e: MouseEvent) => void
  disabled?: boolean
  enableDefaultHoverClasses?: boolean
  classes?: string
  style?: string
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

  const isSvgString = typeof icon === 'string' && !!icon && icon?.startsWith('<svg')
  console.log('isSvg', isSvgString)
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
        style={stlx({
          [`background-Image: url(${icon})`]: typeof icon === 'string' && !!icon && !isSvgString,
          [width as string]: true,
          [height as string]: !!height,
          [style]: !!style,
        })}
        role={onClick ? 'button' : undefined}
        // @ts-ignore
        onClick={disabled ? () => null : onClick}
        title={title}
        // Causes the page to break
        // {...(isSvgString ? { dangerouslySetInnerHTML: { __html: icon } } : {})}
      >
        {typeof icon === 'function' && icon()}
      </span>
    </span>
  )
}

export default IconButton
