import React from 'react';
import styles from './VideoComponent.scss'
import { clsx } from '../../../utils/clsx'

export function VideoComponent () {
  return (
    <section className={styles.videoSection}>
      <div className={globalThis.globalStyles.container}>
        <div className={clsx({[styles.videoSectionWrapper]: true})}>
          <iframe 
            src="https://www.youtube.com/embed/cFWpwtkto1s" 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>
    </section>
  )
}

