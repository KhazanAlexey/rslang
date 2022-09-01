import React from 'react'
import Words from 'src/components/words/Words'
import Detail from '../detail/Detail'
import styles from './CompleteSubpage.module.scss'

const CompleteSubpage: React.FC<any> = () => {
  return (
    <section className=''>
      <section>
        <div className={globalThis.globalStyles.container}>
          <h2 className={globalThis.globalStyles.sectionTitle}>Изученные слова</h2>
          
        </div>  
      </section>
      <section className=''>  
        <div className={globalThis.globalStyles.container}>
          <Detail 
              
              complete={false}
              hard={false} />
        </div>
        <Words />
      </section>
    </section>
  )
}

export default CompleteSubpage