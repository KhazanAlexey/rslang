import React from 'react';
import styles from './VideoComponent.scss'
import { clsx } from '../../../utils/clsx'

const videoId = 'cFWpwtkto1s'
const YoutubeEmbed = (embedId) => (
  <div className={styles.videoContainer}>
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
)

export function VideoComponent () {
  return (
    <section className={styles.videoSection}>
      <div className={globalThis.globalStyles.container}>
        <div className={clsx({[styles.videoSectionWrapper]: true})}>
          <div className={styles.videoContainer}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
            />{' '}
          </div>
        </div>
      </div>
    </section>
  )
}

