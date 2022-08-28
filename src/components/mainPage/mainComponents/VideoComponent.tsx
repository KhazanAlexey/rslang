import React from 'react'
import styles from './VideoComponent.scss'
import { clsx } from '../../../utils/clsx'

const videoId = 'cFWpwtkto1s'
const YoutubeEmbed = (embedId) => (
  // https://www.npmjs.com/package/react-player
  <div></div>
)

const VideoComponent: React.FC<any> = () => {
  return (
    <section className={styles.videoSection}>
      <div className={globalThis.globalStyles.container}>
        <div className={clsx({ [styles.videoSectionWrapper]: true })}>
          <div className={styles.videoContainer}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='video'
            />{' '}
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoComponent
