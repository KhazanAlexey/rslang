import React from 'react'
import logo from '../../../assets/loader/loader.svg'
import { clsx } from '../../../utils/clsx'
import styles from './styles/loader.module.scss'

type Props = {
  containerClasses?: string
}

function LoaderDefault(props: Props) {
  const { containerClasses = '' } = props

  return (
    <div
      className={clsx({
        [styles.loaderContainer]: true,
        [containerClasses]: !!containerClasses,
      })}
    >
      <div
        className={styles.loader}
        style={{
          backgroundImage: `url("${logo}")`,
        }}
      >
        {/*<svg*/}
        {/*  width='100%'*/}
        {/*  height='100%'*/}
        {/*  viewBox='0 0 50 50'*/}
        {/*  fill='none'*/}
        {/*  xmlns='http://www.w3.org/2000/svg'*/}
        {/*>*/}
        {/*  <path*/}
        {/*    d='M41.0714 44.355C33.2905 50.7844 22.6935 51.6268 14.0956 47.3665L17.6197 44.4545C24.4789 47.117 32.4673 46.1093 38.4338 41.1792C44.4004 36.249 46.8795 28.6071 45.5333 21.3893L49.0573 18.4773C51.654 27.6967 48.8523 37.9256 41.0714 44.355Z'*/}
        {/*    fill='#6879EB'*/}
        {/*  />*/}
        {/*  <path*/}
        {/*    d='M35.8997 2.63356L32.3757 5.54555C25.5459 2.91828 17.5629 3.86187 11.5615 8.82088C5.59495 13.7511 3.14513 21.4282 4.46205 28.6107L0.93796 31.5227C-1.65859 22.3034 1.17799 12.0456 8.92401 5.64502C16.7049 -0.784402 27.3017 -1.62682 35.8997 2.63356Z'*/}
        {/*    fill='#6879EB'*/}
        {/*  />*/}
        {/*</svg>*/}
      </div>
    </div>
  )
}

export default LoaderDefault
